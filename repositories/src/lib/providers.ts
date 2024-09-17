import { Canton, DATA_SOURCE, District, EventEntity, Member, Product, Province, Purchase } from '@honda500/data-access';
import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';

export const MEMBER_REPOSITORY = 'MEMBER_REPOSITORY';
export const PRODUCT_REPOSITORY = 'PRODUCT_REPOSITORY';
export const EVENT_REPOSITORY = 'EVENT_REPOSITORY';
export const PURCHASE_REPOSITORY = 'PURCHASE_REPOSITORY';
export const PROVINCES_REPOSITORY = 'PROVINCES_REPOSITORY';
export const CANTONS_REPOSITORY = 'CANTONS_REPOSITORY';
export const DISTRICTS_REPOSITORY = 'DISTRICTS_REPOSITORY';

export const providers: Provider[] = [
  {
    provide: MEMBER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Member),
    inject: [DATA_SOURCE],
  },
  {
    provide: PRODUCT_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Product),
    inject: [DATA_SOURCE],
  },
  {
    provide: EVENT_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(EventEntity),
    inject: [DATA_SOURCE],
  },
  {
    provide: PURCHASE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Purchase),
    inject: [DATA_SOURCE],
  },
  {
    provide: PROVINCES_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Province),
    inject: [DATA_SOURCE],
  },
  {
    provide: CANTONS_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Canton),
    inject: [DATA_SOURCE],
  },
  {
    provide: DISTRICTS_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(District),
    inject: [DATA_SOURCE],
  },
];
