import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Canton, District, PurchaseDetail } from '@honda500/dtos';
import { ShippingAddressForm } from '../../../events/details/add-purchase-modal/models';
import { PurchaseService } from '../../../purchases/purchases.service';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatGridListModule,
  ],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
})
export class AddressFormComponent implements OnInit, OnDestroy {
  @Input({ required: true })
  controlKey = '';

  initialData = input<PurchaseDetail[]>();

  private readonly purchaseService = inject(PurchaseService);

  private parentContainer = inject(ControlContainer);

  get parentForm() {
    return this.parentContainer.control as FormGroup;
  }

  private provinceControl = new FormControl<number | null>(null, {
    nonNullable: true,
    validators: Validators.required,
  });

  private cantonControl = new FormControl<number | null>(null, {
    nonNullable: true,
    validators: Validators.required,
  });

  private readonly province = toSignal<number | null>(
    this.provinceControl.valueChanges
  );

  private readonly canton = toSignal<number | null>(
    this.cantonControl.valueChanges
  );

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

  private readonly control = new FormGroup<ShippingAddressForm | null>({
    province: this.provinceControl,
    canton: this.cantonControl,
    zipCode: new FormControl<number | null>(null, {
      nonNullable: true,
      validators: Validators.required,
    }),
    signals: new FormControl<string | null>(null, {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  constructor() {
    effect(() => {
      const details = this.initialData();
      const address = details?.[0].shippingDetails;
      console.log(address, details);
      if (address) {
        this.control.setValue(address);
      }
    });
  }

  ngOnInit(): void {
    this.parentForm.addControl(this.controlKey, this.control);
  }

  ngOnDestroy(): void {
    this.parentForm.removeControl(this.controlKey);
  }
}
