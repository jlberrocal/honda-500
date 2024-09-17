import { EventEntity, Member, Product, Purchase } from '@honda500/data-access';
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
    private readonly purchases: Repository<Purchase>
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

  create(purchase: Purchase) {
    return this.purchases.insert(purchase);
  }
}
