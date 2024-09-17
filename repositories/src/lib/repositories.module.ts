import {
  DataAccessModule,
  mapToMember,
  Member,
  Province,
  RawMember,
} from '@honda500/data-access';
import { HttpModule, HttpService } from '@nestjs/axios';
import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { map, switchMap } from 'rxjs';
import { EventsService } from './events.service';
import { MembersService } from './members.service';
import * as products from './products.json';
import { ProductsService } from './products.service';
import { providers } from './providers';
import { ProvincesService } from './provinces.service';
import { PurchasesService } from './purchases.service';

export const services = [
  MembersService,
  ProductsService,
  EventsService,
  PurchasesService,
  ProvincesService,
];

interface IdName {
  id: number;
  name: string;
}

interface RawResponse extends IdName {
  cantones: (IdName & { distritos: IdName[] })[];
}

export const mapDistrict = (raw: IdName): IdName => ({
  id: raw['id'] as number,
  name: raw['name'] as string,
});

export const mapCanton = (
  raw: IdName & { distritos: IdName[] }
): IdName & { districts: IdName[] } => ({
  id: raw.id,
  name: raw.name,
  districts: raw.distritos.map(mapDistrict),
});

export const mapProvince = (
  raw: IdName & { cantones: (IdName & { distritos: IdName[] })[] }
): IdName & { cantons: IdName[] } => ({
  id: raw.id,
  name: raw.name,
  cantons: raw.cantones.map(mapCanton),
});

@Module({
  imports: [DataAccessModule, HttpModule],
  controllers: [],
  providers: [...providers, ...services],
  exports: [...services],
})
export class RepositoriesModule implements OnModuleInit {
  private readonly logger = new Logger(RepositoriesModule.name);
  constructor(
    private membersService: MembersService,
    private productsService: ProductsService,
    private provincesService: ProvincesService,
    private http: HttpService
  ) {}

  async onModuleInit() {
    if (process.env['SYNC_GOOGLE'] === 'true') {
      this.syncWithGoogle();
    } else {
      this.logger.log('no need to query google sheets for data');
    }

    if (process.env['SYNC_PRODUCTS'] === 'true') {
      this.syncProducts();
    } else {
      this.logger.log('no need to sync products from json file');
    }

    if (process.env['SYNC_LOCATIONS'] === 'true') {
      this.syncLocations();
    } else {
      this.logger.log('no need to sync products from json file');
    }
  }

  private async syncWithGoogle() {
    this.logger.debug('syncing data with google sheets');
    if (process.env['GOOGLE_DOCID'] && process.env['GOOGLE_API']) {
      const doc = new GoogleSpreadsheet(process.env['GOOGLE_DOCID'], {
        apiKey: process.env['GOOGLE_API'],
      });
      await doc.loadInfo(); // loads document properties and worksheets
      const sheet = doc.sheetsByIndex[0]; // or use `doc.sheetsById[id]` or `doc.sheetsByTitle[title]`
      const rows = await sheet.getRows<RawMember>();

      const members: Member[] = rows.map(mapToMember);

      try {
        const result = await this.membersService.bulkInsert(members);
        this.logger.log('bulk insert result: ', result.generatedMaps.length);
        this.logger.log(result.identifiers);
      } catch (e) {
        this.logger.error(e);
      }
    } else {
      this.logger.error('docId or apiKey are not configured properly');
    }
  }

  private async syncProducts() {
    this.logger.debug('syncing products');
    try {
      const result = await this.productsService.bulkInsert(products.products);
      this.logger.log('bulk insert result: ', result.generatedMaps.length);
      this.logger.log(result.identifiers);
    } catch (e) {
      this.logger.error(e);
    }
  }

  private async syncLocations() {
    this.logger.debug('syncing locations');
    const base = 'http://localhost:3001/';
    this.http
      .get<RawResponse[]>(base)
      .pipe(
        map((resp) => resp.data),
        map((provinces) => provinces.map(mapProvince)),
        switchMap((p) => this.provincesService.bulkCreate(p as Province[]))
      )
      .subscribe(console.log);
  }
}
