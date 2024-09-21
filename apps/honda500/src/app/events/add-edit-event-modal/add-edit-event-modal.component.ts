import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EditEventDTO } from '@honda500/dtos';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-edit-modal',
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
    MatDatepickerModule,
    NgxMaskDirective,
  ],
  providers: [
    provideNativeDateAdapter(),
    provideNgxMask({
      validation: true,
      dropSpecialCharacters: false,
    }),
  ],
  templateUrl: './add-edit-event-modal.component.html',
  styleUrl: './add-edit-event-modal.component.scss',
})
export class AddEditEventModalComponent {
  data = inject(MAT_DIALOG_DATA) as EditEventDTO;
  minDate = new Date();

  form = new FormGroup({
    name: new FormControl<string>(this.data?.name ?? null, [
      Validators.required,
      Validators.minLength(10),
    ]),
    date: new FormControl<Date>(this.data?.date ?? null, Validators.required),
    time: new FormControl<string | null>(null, Validators.required),
  });
  private nameSignal = toSignal(this.form.get('name')!.valueChanges);
  private dateSignal = toSignal(this.form.get('date')!.valueChanges);
  private timeSignal = toSignal(this.form.get('time')!.valueChanges);
  value = computed(() => {
    const name = this.nameSignal();
    const date = this.dateSignal();
    const time = this.timeSignal();

    const [h, m, s] = time?.split(':').map((s) => +s) ?? [0, 0, 0];
    if (h !== undefined && m !== undefined && s !== undefined) {
      date?.setHours(h, m, s);
    }

    return {
      name,
      date,
    };
  });
}
