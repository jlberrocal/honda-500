import { Product } from '@honda500/data-access';
import { Inject, Injectable } from '@nestjs/common';
import { InsertResult, Repository } from 'typeorm';
import { PRODUCT_REPOSITORY } from './providers';
import { ILikeWildCarded } from './utils';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly products: Repository<Product>
  ) {}

  read(): Promise<[Product[], number]> {
    return this.products.findAndCount();
  }

  search(needle: string) {
    return this.products.find({
      where: [{ name: ILikeWildCarded(needle) }],
      loadEagerRelations: false,
      select: ['id', 'name'],
    });
  }

  bulkInsert(products: Product[]): Promise<InsertResult> {
    return this.products.insert(products);
  }
}
