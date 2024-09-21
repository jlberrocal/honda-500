import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  ControlContainer,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { IdName, Product, PurchaseDetail } from '@honda500/dtos';
import { ProductDetailsForm } from '../../../events/details/add-purchase-modal/models';
import { ProductFieldComponent } from '../product-field/product-field.component';

@Component({
  selector: 'app-products-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    ProductFieldComponent,
    MatInputModule,
  ],
  templateUrl: './products-form.component.html',
  styleUrl: './products-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
})
export class ProductsFormComponent implements OnInit, OnDestroy {
  @Input({ required: true })
  controlKey = '';

  initialData = input<PurchaseDetail[]>();

  parentContainer = inject(ControlContainer);

  get products() {
    return this.parentForm.get(this.controlKey) as FormArray<FormGroup>;
  }

  private get parentForm(): FormGroup {
    return this.parentContainer.control as FormGroup;
  }

  private control = new FormArray<FormGroup<ProductDetailsForm>>([
    this.createProduct(),
  ]);

  constructor() {
    effect(() => {
      const purchases = this.initialData();
      this.control.controls = purchases?.map(p => this.createProduct(p.product, p.quantity)) ?? []
    });
  }

  ngOnInit(): void {
    this.parentForm.addControl(this.controlKey, this.control);
  }

  private createProduct(
    product: Product | null = null,
    quantity: number | null = null
  ): FormGroup<ProductDetailsForm> {
    return new FormGroup<ProductDetailsForm>({
      product: new FormControl<IdName | null>(
        product ? { id: product.id, name: product.name } : null,
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      quantity: new FormControl<number | null>(quantity ?? null, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(1)],
      }),
    });
  }

  addProduct() {
    this.products.push(this.createProduct());
  }

  removeProduct(index: number) {
    this.products.removeAt(index);
  }

  ngOnDestroy(): void {
    this.parentForm.removeControl(this.controlKey);
  }
}
