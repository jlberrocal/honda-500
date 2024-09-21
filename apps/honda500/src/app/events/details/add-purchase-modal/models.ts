import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { IdName, SearchResult } from '@honda500/dtos';

export interface ProductDetailsForm {
  product: FormControl<IdName | null>;
  quantity: FormControl<number | null>;
}

export interface AddPurchaseForm {
  eventId: FormControl<number>;
  member: FormControl<SearchResult | null>;
  products: FormArray<FormGroup<ProductDetailsForm>>;
  shippingMethod: FormControl<'pickup' | 'someone' | 'shipping'>;
  someoneName: FormControl<string | null>;
  shippingDetails: FormGroup<ShippingAddressForm | null>;
}

export interface ShippingAddressForm {
  province: FormControl<number | null>;
  canton: FormControl<number | null>;
  zipCode: FormControl<number | null>;
  signals: FormControl<string | null>;
}
