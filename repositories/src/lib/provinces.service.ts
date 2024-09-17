import { Canton, District, Province } from '@honda500/data-access';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import {
  CANTONS_REPOSITORY,
  DISTRICTS_REPOSITORY,
  PROVINCES_REPOSITORY,
} from './providers';

@Injectable()
export class ProvincesService {
  constructor(
    @Inject(PROVINCES_REPOSITORY)
    private readonly provinces: Repository<Province>,
    @Inject(CANTONS_REPOSITORY)
    private readonly cantons: Repository<Canton>,
    @Inject(DISTRICTS_REPOSITORY)
    private readonly districts: Repository<District>
  ) {}

  getAll(): Promise<Province[]> {
    return this.provinces.find();
  }

  async bulkCreate(provinces: Province[]) {
    for (const p of provinces) {
      const province = this.provinces.create(p);
      province.cantons = p.cantons.map((c) => {
        const canton = this.cantons.create(c);
        canton.districts = c.districts.map((d) => this.districts.create(d));
        return canton;
      });
      console.log(p)
      await this.provinces.save(p);
    }
  }
}
