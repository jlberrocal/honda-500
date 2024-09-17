import { EventEntity } from '@honda500/data-access';
import { EventsService } from '@honda500/repositories';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

@Controller('events')
export class EventsController {
  constructor(private readonly repository: EventsService) {}

  @Get()
  read(): Promise<[EventEntity[], number]> {
    return this.repository.read();
  }
  @Get(':id')
  readById(@Param('id') id: number): Promise<EventEntity> {
    return this.repository.readById(id);
  }


  @Post()
  create(@Body() body: EventEntity) {
    return this.repository.create(body);
  }

  @Put(':id')
  edit(@Param('id') id: number, @Body() body: EventEntity) {
    return this.repository.update(id, body);
  }
}
