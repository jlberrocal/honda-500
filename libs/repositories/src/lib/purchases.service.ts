import {
  EventEntity,
  Member,
  Product,
  Purchase,
  PurchaseDetail,
  ShippingAddress,
} from '@honda500/data-access';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import {
  EVENT_REPOSITORY,
  MEMBER_REPOSITORY,
  PRODUCT_REPOSITORY,
  PURCHASE_REPOSITORY,
} from './providers';

@Injectable()
export class PurchasesService {
  private readonly logger = new Logger(PurchasesService.name);

  constructor(
    @Inject(PURCHASE_REPOSITORY)
    private readonly purchases: Repository<Purchase>,
    @Inject(MEMBER_REPOSITORY)
    private readonly members: Repository<Member>,
    @Inject(EVENT_REPOSITORY)
    private readonly events: Repository<EventEntity>,
    @Inject(PRODUCT_REPOSITORY)
    private readonly products: Repository<Product>
  ) {}

  read(): Promise<[Purchase[], number]> {
    return this.purchases.findAndCount();
  }

  readByEventId(eventId: number): Promise<[Purchase[], number]> {
    return this.purchases.findAndCountBy({
      event: {
        id: eventId,
      },
    });
  }

  async create(
    partialMember: Partial<Member>,
    eventId: number,
    products: { productId: number; quantity: number }[],
    shippingMethod: string,
    someoneName?: string,
    shippingAddress?: ShippingAddress
  ) {
    const member = await this.members.findOneBy({ id: partialMember.id });
    const event = await this.events.findOneBy({ id: eventId });

    if (!event) {
      throw new Error('event must match with a already stored value');
    }

    const purchase = this.purchases.create();
    if (member) {
      purchase.member = member;
    } else {
      purchase.nonMemberName = partialMember.name;
      purchase.nonMemberPhone = partialMember.phone;
    }

    purchase.event = event;
    purchase.details = [];

    for (const item of products) {
      const product = await this.products.findOneBy({ id: item.productId });
      if (!product) {
        throw new Error(`Producto con ID ${item.productId} no encontrado`);
      }

      const purchaseDetail = new PurchaseDetail();
      purchaseDetail.product = product;
      purchaseDetail.quantity = item.quantity;
      purchaseDetail.shippingMethod = shippingMethod;
      purchaseDetail.someoneName = someoneName;
      purchaseDetail.shippingAddress = shippingAddress;
      purchase.details.push(purchaseDetail);
    }
    return await this.purchases.save(purchase);
  }
}
