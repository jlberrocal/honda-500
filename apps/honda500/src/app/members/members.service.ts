import { Injectable } from '@angular/core';
import { Member, SearchResult } from '@honda500/dtos';
import { Observable } from 'rxjs';
import { IService } from '../shared/iservice';

@Injectable({
  providedIn: 'root',
})
export class MembersService extends IService<Member> {
  getData(): Observable<[Member[], number]> {
    return this.http.get<[Member[], number]>('/api/members');
  }

  search(needle: string): Observable<SearchResult[]> {
    return this.http.get<SearchResult[]>(`/api/members/search?needle=${needle}`);
  }
}
