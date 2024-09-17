import { Module } from '@nestjs/common';

import { RepositoriesModule } from '@honda500/repositories';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MembersController } from './members/members.controller';
import { ProductsController } from './products/products.controller';
import { EventsController } from './events/events.controller';
import { PurchasesController } from './purchases/purchases.controller';
import { LocationsController } from './locations/locations.controller';

@Module({
  imports: [
    RepositoriesModule,
    ConfigModule.forRoot({
      envFilePath: '.env.dev-local',
    }),
  ],
  controllers: [
    AppController,
    MembersController,
    ProductsController,
    EventsController,
    PurchasesController,
    LocationsController,
  ],
  providers: [AppService],
})
export class AppModule {}
