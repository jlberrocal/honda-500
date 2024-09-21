import { EventEntity } from '@honda500/data-access';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { EVENT_REPOSITORY } from './providers';

@Injectable()
export class EventsService {
  constructor(
    @Inject(EVENT_REPOSITORY)
    private readonly events: Repository<EventEntity>
  ) {}

  create(member: EventEntity) {
    return this.events.save(member);
  }

  read(): Promise<[EventEntity[], number]> {
    return this.events.findAndCount();
  }

  readById(id: number) {
    return this.events.findOneBy({});
  }

  update(eventId: number, event: EventEntity) {
    return this.events.update(eventId, event);
  }
}
