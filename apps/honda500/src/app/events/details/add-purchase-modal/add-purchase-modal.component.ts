import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Purchase, SearchResult, ShippingType } from '@honda500/dtos';
import { AddressFormComponent } from '../../../shared/components/address-form/address-form.component';
import { MemberFieldComponent } from '../../../shared/components/member-field/member-field.component';
import { ProductsFormComponent } from '../../../shared/components/products-form/products-form.component';
import { ShippingTypeComponent } from "../../../shared/components/shipping-type/shipping-type.component";

@Component({
  selector: 'app-add-purchase-modal',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    AsyncPipe,
    ProductsFormComponent,
    AddressFormComponent,
    MemberFieldComponent,
    ShippingTypeComponent
],
  templateUrl: './add-purchase-modal.component.html',
  styleUrl: './add-purchase-modal.component.scss',
})
export class AddPurchaseModalComponent {
  data = inject(MAT_DIALOG_DATA) as Purchase & { eventId: number };

  someoneControl = new FormControl<string | null>(
    this.data.details?.[0].someoneName ?? null
  );

  form = new FormGroup({
    eventId: new FormControl<number>(this.data.eventId, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    member: new FormControl<SearchResult | null>(
      this.data.member
        ? { id: this.data.member!.id!, name: this.data.member!.name! }
        : null,
      {
        nonNullable: true,
        validators: [Validators.required],
      }
    ),
    someoneName: this.someoneControl,
  });

  shippingMethod = signal<ShippingType>('pickup')
}
