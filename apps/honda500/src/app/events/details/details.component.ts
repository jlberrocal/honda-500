import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AddPurchase, EventDTO, Member } from '@honda500/dtos';
import { exhaustMap, filter, first, map, switchMap } from 'rxjs';
import { PurchaseService } from '../../purchases/purchases.service';
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
  route = inject(ActivatedRoute);
  dialog = inject(MatDialog);
  purchaseService = inject(PurchaseService);

  dataSource = new MatTableDataSource<Member & { totalAmount: number }>([]);
  readonly columns = ['name', 'purchases', 'totalAmount', 'actions'];

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params) => params['id']),
        exhaustMap((id) => this.purchaseService.getDataForEvent(id)),
        map(resp => resp[0])
      )
      .subscribe((purchases) => {
        console.log(purchases);
        this.event = purchases[0].event;
        // this.event = event;
        // this.dataSource.data = event.members.map((member) => {
        //   return {
        //     ...member,
        //     totalAmount:
        //       member.purchases?.reduce(
        //         (acc, p) => acc + p.product.totalPrice * p.quantity,
        //         0
        //       ) ?? 0,
        //   };
        // });
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
    const lastPurchase = this.dataSource.data
      .find((member) => member.id === memberId)
      ?.purchases?.pop();
    const ref = this.dialog.open<
      AddPurchaseModalComponent,
      Partial<AddPurchase>,
      AddPurchase | null
    >(AddPurchaseModalComponent, {
      data: {
        eventId,
        memberId: memberId!,
        shippingMethod: lastPurchase?.shippingMethod,
        shippingDetails: lastPurchase?.shippingDetails,
        someoneName: lastPurchase?.someoneName,
      },
      minHeight: '200px',
      minWidth: '600px',
    });

    ref
      .afterClosed()
      .pipe(
        first(),
        filter((resp) => resp !== null && resp !== undefined),
        switchMap((purchase) => this.purchaseService.save(purchase))
      )
      .subscribe((purchase) => {
        console.log(purchase);
      });
  }
}
