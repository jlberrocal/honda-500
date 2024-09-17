import { Injectable } from '@angular/core';
import { Product } from '@honda500/dtos';
import { Observable } from 'rxjs';
import { IService } from '../shared/iservice';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends IService<Product> {
  override getData(): Observable<[Product[], number]> {
    return this.http.get<[Product[], number]>('/api/products');
  }
  search(needle: string): Observable<Product[]> {
    return this.http.get<Product[]>(`/api/products/search?needle=${needle}`);
  }
}
