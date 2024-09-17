import { Product } from '@honda500/data-access';
import { ProductsService } from '@honda500/repositories';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('products')
export class ProductsController {
    constructor(private readonly products: ProductsService) {}

    @Get()
    read(): Promise<[Product[], number]> {
        return this.products.read();
    }

    @Get('search')
    membersSearch(@Query('needle') needle: string): Promise<Product[]> {
      return this.products.search(needle);
    }
}
