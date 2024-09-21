import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  ControlContainer,
  ReactiveFormsModule
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SearchResult } from '@honda500/dtos';
import { of } from 'rxjs';
import { PurchaseService } from '../../../purchases/purchases.service';

@Component({
  selector: 'app-product-field',
  standalone: true,
  imports: [
    MatAutocompleteModule,
    MatFormFieldModule,
    AsyncPipe,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './product-field.component.html',
  styleUrl: './product-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
})
export class ProductFieldComponent {
  purchaseService = inject(PurchaseService);

  productOptions$ = of<SearchResult[]>([]);

  filter(event: Event) {
    const target = event.target as HTMLInputElement;
    const { value } = target;

    this.productOptions$ = this.purchaseService.getProductsForPurchase(value);
  }

  displayFn(value: SearchResult | null): string {
    if (!value) {
      return '';
    }
    return value.name;
  }
}
