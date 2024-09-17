import { AsyncPipe } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
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
import { MatSelectModule } from '@angular/material/select';
import { AddPurchase, Canton, District, SearchResult } from '@honda500/dtos';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { of } from 'rxjs';
import { PurchaseService } from '../../../purchases/purchases.service';

@UntilDestroy()
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
    MatAutocompleteModule,
    MatRadioModule,
    MatSelectModule,
    AsyncPipe,
  ],
  templateUrl: './add-purchase-modal.component.html',
  styleUrl: './add-purchase-modal.component.scss',
})
export class AddPurchaseModalComponent implements OnInit {
  data = inject(MAT_DIALOG_DATA) as Partial<AddPurchase>;
  purchaseService = inject(PurchaseService);

  memberOptions$ = of<SearchResult[]>([]);
  productOptions$ = of<SearchResult[]>([]);

  provinceOptions = toSignal(this.purchaseService.getLocations(), {
    initialValue: [],
  });
  cantonOptions = computed<Canton[]>(() => {
    const selectedProvince = this.province();
    if (!selectedProvince) {
      return [];
    }
    return (
      this.provinceOptions().find((p) => p.id === selectedProvince)?.cantons ??
      []
    );
  });
  districtOptions = computed<District[]>(() => {
    const selectedCanton = this.canton();
    if (!selectedCanton) {
      return [];
    }
    return (
      this.cantonOptions().find((c) => c.id === selectedCanton)?.districts ?? []
    );
  });

  shippingControl = new FormControl<'pickup' | 'someone' | 'shipping'>(
    'pickup'
  );
  someoneControl = new FormControl(null);
  provinceControl = new FormControl<number | null>(null);
  cantonControl = new FormControl<number | null>(null);

  private readonly province = toSignal<number | null>(
    this.provinceControl.valueChanges
  );
  private readonly canton = toSignal<number | null>(
    this.cantonControl.valueChanges
  );

  form = new FormGroup({
    event: new FormControl({ id: this.data.eventId }, [Validators.required]),
    member: new FormControl('', Validators.required),
    product: new FormControl('', Validators.required),
    quantity: new FormControl(0, [Validators.required, Validators.min(1)]),
    shippingMethod: this.shippingControl,
    someoneName: this.someoneControl,
    shippingDetails: new FormGroup({
      province: this.provinceControl,
      canton: this.cantonControl,
      zipCode: new FormControl(null),
      signals: new FormControl(null),
    }),
  });

  ngOnInit(): void {
    this.shippingControl.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        const controls = (this.form.get('shippingDetails') as FormGroup)
          .controls;
        Object.values(controls).forEach((control) => {
          control.setValidators(null);
        });
        this.someoneControl.setValidators(null);

        if (value === 'someone') {
          this.someoneControl.setValidators(Validators.required);

          this.someoneControl.updateValueAndValidity();
        } else if (value === 'shipping') {
          for (const key in controls) {
            const control = controls[key] as FormControl;
            control.setValidators(Validators.required);
          }
        }
        this.someoneControl.updateValueAndValidity();
        Object.values(controls).forEach((control) => {
          control.updateValueAndValidity();
        });
      });
  }

  filter(event: Event, type: 'members' | 'products') {
    const target = event.target as HTMLInputElement;
    const { value } = target;

    if (value.length >= 3) {
      switch (type) {
        case 'members':
          this.memberOptions$ =
            this.purchaseService.getMembersForPurchase(value);
          break;
        case 'products':
          this.productOptions$ =
            this.purchaseService.getProductsForPurchase(value);
          break;
        default:
          console.error('invalid filter type');
          break;
      }
    }
  }

  displayFn(value: SearchResult) {
    return value.name;
  }
}
