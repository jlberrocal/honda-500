import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

export abstract class IService<T> {
  http = inject(HttpClient);

  abstract getData(): Observable<[T[], number]>;
}
