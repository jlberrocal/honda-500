import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Purchase, SearchResult, ShippingType } from '@honda500/dtos';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductsFormComponent } from '../../../shared/components/products-form/products-form.component';
import { MatRadioModule } from '@angular/material/radio';
import { AddressFormComponent } from '../../../shared/components/address-form/address-form.component';
import { ShippingTypeComponent } from "../../../shared/components/shipping-type/shipping-type.component";

@Component({
  selector: 'app-non-member-purchase',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    ProductsFormComponent,
    MatRadioModule,
    AddressFormComponent,
    ShippingTypeComponent
],
  templateUrl: './non-member-purchase.component.html',
  styleUrl: './non-member-purchase.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NonMemberPurchaseComponent {
  data = inject(MAT_DIALOG_DATA) as Purchase & { eventId: number };

  someoneControl = new FormControl<string | null>(
    this.data.details?.[0].someoneName ?? null
  );

  shippingMethod = signal<ShippingType>('pickup')

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
}
