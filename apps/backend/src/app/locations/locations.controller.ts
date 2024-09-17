import { Province } from '@honda500/data-access';
import { ProvincesService } from '@honda500/repositories';
import { Controller, Get } from '@nestjs/common';

@Controller('locations')
export class LocationsController {
  constructor(private readonly repository: ProvincesService) {}

  @Get()
  locations(): Promise<Province[]> {
    return this.repository.getAll();
  }
}
