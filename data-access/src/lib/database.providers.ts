import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { EventEntity } from './entities/event.entity';
import { Member } from './entities/member.entity';
import { Product } from './entities/products.entity';
import { Purchase } from './entities/purchase.entity';
import { Province } from './entities/province.entity';
import { Canton } from './entities/canton.entity';
import { District } from './entities/district.entity';

export const DATA_SOURCE = 'DATA_SOURCE';

export const databaseProviders: Provider[] = [
  {
    provide: DATA_SOURCE,
    useFactory: () => {
      const dataSource = new DataSource({
        type: 'better-sqlite3',
        database: 'honda-500-cr.db3',
        synchronize: true,
        entities: [Member, Product, EventEntity, Purchase, Province, Canton, District],
        logger: 'advanced-console',
        logging: 'all',
      });
      return dataSource.initialize();
    },
  },
];
