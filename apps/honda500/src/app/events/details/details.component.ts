import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AddPurchase, AddPurchaseDTO, EventDTO, PurchaseDetail } from '@honda500/dtos';
import { EMPTY, exhaustMap, filter, first, map, switchMap } from 'rxjs';
import { PurchaseService } from '../../purchases/purchases.service';
import { EventsService } from '../events.service';
import { AddPurchaseModalComponent } from './add-purchase-modal/add-purchase-modal.component';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    DatePipe,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  event?: EventDTO;
  service = inject(EventsService);
  route = inject(ActivatedRoute);
  dialog = inject(MatDialog);
  purchaseService = inject(PurchaseService);

  dataSource = new MatTableDataSource<{
    id: number;
    memberId: string
    name: string;
    totalAmount: number;
    purchases: number;
    requiresShipping: 'Yes' | 'No'
  }>([]);
  readonly columns = [
    'name',
    'purchases',
    'totalAmount',
    'requiresShipping',
    'actions',
  ];

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params) => params['id']),
        exhaustMap((id) => this.service.getEvent(id))
      )
      .subscribe((event) => {
        this.event = event;
        this.dataSource.data = event.purchases.map((p) => {
          const requiresShipping = p.details.some(
            (p) => p.shippingMethod === 'shipping'
          );
          return {
            id: p.id,
            memberId: p.member.id!,
            name: p.member.name!,
            purchases: p.details.length,
            requiresShipping: requiresShipping ? 'Yes' : 'No',
            totalAmount: this.reduceAmout(p.details, requiresShipping),
          };
        });
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openEditModal(eventId?: number, memberId: string | null = null) {
    if (!eventId) {
      return;
    }

    const member = this.event?.purchases.find((p) => p.member.id === memberId);

    const ref = this.dialog.open<
      AddPurchaseModalComponent,
      Partial<AddPurchase>,
      AddPurchase | null
    >(AddPurchaseModalComponent, {
      data: { eventId, ...member },
      minHeight: '200px',
      minWidth: '600px',
    });

    ref
      .afterClosed()
      .pipe(
        first(),
        filter((resp) => resp !== null && resp !== undefined),
        map((purchase: AddPurchase) => ({
          ...purchase,
          products: purchase.products.map((p) => ({
            productId: p.product.id,
            quantity: p.quantity,
          })),
        })),
        switchMap((purchase: AddPurchaseDTO) =>
          memberId
            ? EMPTY
            : this.purchaseService.save(purchase)
        )
      )
      .subscribe((purchase) => {
        if (!memberId) {
          const requiresShipping = purchase.details.some(
            (p) => p.shippingMethod === 'shipping'
          );
          this.dataSource.data = [...this.dataSource.data, {
            id: purchase.id,
            memberId: purchase.member.id!,
            name: purchase.member.name!,
            purchases: purchase.details.length,
            requiresShipping: requiresShipping ? 'Yes' : 'No',
            totalAmount: this.reduceAmout(purchase.details, requiresShipping),
          }]
        }
        console.log(purchase);
      });
  }

  private reduceAmout(purchaseDetails: PurchaseDetail[], requiresShipping: boolean) {
    return Math.ceil(purchaseDetails.reduce(
      (acc, current) =>
        acc + current.quantity * current.product.totalPrice,
      requiresShipping ? 2000 : 0
    ))
  }
}
