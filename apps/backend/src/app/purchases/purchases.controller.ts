import { PurchasesService } from '@honda500/repositories';
import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { AddPurchase } from './purchase.model';

@Controller('purchases')
export class PurchasesController {
  private readonly logger = new Logger(PurchasesController.name);

  constructor(private readonly purchases: PurchasesService) {}

  @Get()
  read() {
    return this.purchases.read();
  }

  @Get(':eventId')
  readByEventId(@Param('id') id: number) {
    return this.purchases.readByEventId(id);
  }

  @Post()
  create(@Body() purchase: AddPurchase) {
    return this.purchases.create(
      purchase.member,
      purchase.eventId,
      purchase.products,
      purchase.shippingMethod,
      purchase.someoneName,
      purchase.shippingDetails
    );
  }
}
