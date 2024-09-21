import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SearchResult } from '@honda500/dtos';
import { of } from 'rxjs';
import { PurchaseService } from '../../../purchases/purchases.service';

@Component({
  selector: 'app-member-field',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatAutocompleteModule, AsyncPipe],
  templateUrl: './member-field.component.html',
  styleUrl: './member-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
})
export class MemberFieldComponent {
  purchaseService = inject(PurchaseService);

  memberOptions$ = of<SearchResult[]>([]);

  filter(event: Event) {
    const target = event.target as HTMLInputElement;
    const { value } = target;

    if (value.length >= 3) {
      this.memberOptions$ = this.purchaseService.getMembersForPurchase(value);
    }
  }

  displayFn(value: SearchResult | null): string {
    if (!value) {
      return '';
    }
    return value.name;
  }
}
