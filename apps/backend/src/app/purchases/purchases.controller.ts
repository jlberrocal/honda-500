import { Purchase } from '@honda500/data-access';
import { PurchasesService } from '@honda500/repositories';
import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';

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
  create(@Body() purchase: Purchase) {
    return this.purchases.create(purchase);
  }
}
