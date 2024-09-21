import { Injectable } from '@angular/core';
import { EditEventDTO, EventDTO } from '@honda500/dtos';
import { Observable } from 'rxjs';
import { IService } from '../shared/iservice';
import { UpdateResult } from 'typeorm';

@Injectable({
  providedIn: 'root',
})
export class EventsService extends IService<EventDTO> {
  getData(): Observable<[EventDTO[], number]> {
    return this.http.get<[EventDTO[], number]>('/api/events');
  }

  getEvent(eventId: number): Observable<EventDTO> {
    return this.http.get<EventDTO>(`/api/events/${eventId}`);
  }

  editEvent(eventId: number, event: EditEventDTO): Observable<UpdateResult> {
    return this.http.put<UpdateResult>(`/api/events/${eventId}`, event);
  }

  addEvent(event: EditEventDTO): Observable<EventDTO> {
    return this.http.post<EventDTO>('/api/events', event);
  }
}
