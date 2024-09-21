import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatLabel } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { PurchaseDetail, ShippingType } from '@honda500/dtos';

@Component({
  selector: 'app-shipping-type',
  standalone: true,
  imports: [MatLabel, MatRadioModule, ReactiveFormsModule],
  templateUrl: './shipping-type.component.html',
  styleUrl: './shipping-type.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
})
export class ShippingTypeComponent implements OnInit, OnDestroy {
  @Input({ required: true })
  controlKey = '';

  initialData = input<PurchaseDetail[]>();

  parentContainer = inject(ControlContainer);

  private get parentForm(): FormGroup {
    return this.parentContainer.control as FormGroup;
  }

  private control = new FormControl<ShippingType>(
    'pickup',
    { nonNullable: true, validators: [Validators.required] }
  );

  shippingMethodChange = outputFromObservable(this.control.valueChanges);

  constructor() {
    effect(() => {
      const details = this.initialData();
      const type = details?.[0].shippingMethod;
      this.control.setValue(type ?? 'pickup');
    })
  }

  ngOnInit(): void {
    this.parentForm.addControl(this.controlKey, this.control);
  }

  ngOnDestroy(): void {
    this.parentForm.removeControl(this.controlKey);
  }
}
