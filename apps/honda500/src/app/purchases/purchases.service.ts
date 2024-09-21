import { Injectable, inject } from '@angular/core';
import {
  AddPurchaseDTO,
  Member,
  Product,
  Province,
  Purchase,
  PurchaseDetail,
  SearchResult
} from '@honda500/dtos';
import { Observable } from 'rxjs';
import { MembersService } from '../members/members.service';
import { ProductsService } from '../products/products.service';
import { IService } from '../shared/iservice';

@Injectable({
  providedIn: 'root',
})
export class PurchaseService extends IService<Purchase> {
  private readonly members = inject(MembersService);
  private readonly products = inject(ProductsService);

  override getData(): Observable<[Purchase[], number]> {
    throw new Error('Method not implemented.');
  }

  save(purchase: AddPurchaseDTO): Observable<Purchase> {
    return this.http.post<Purchase>('/api/purchases', purchase);
  }

  update(id: number, purchase: AddPurchaseDTO): Observable<PurchaseDetail> {
    return this.http.put<PurchaseDetail>(`/api/purchases/${id}`, purchase);
  }

  getDataForEvent(eventId: number): Observable<[Purchase[], number]> {
    return this.http.get<[Purchase[], number]>(`/api/purchases/${eventId}`);
  }

  getMembersForPurchase(needle: string): Observable<SearchResult[]> {
    return this.members.search(needle);
  }

  getProductsForPurchase(needle: string): Observable<Product[]> {
    return this.products.search(needle);
  }

  getLocations(): Observable<Province[]> {
    return this.http.get<Province[]>('/api/locations');
  }
}
