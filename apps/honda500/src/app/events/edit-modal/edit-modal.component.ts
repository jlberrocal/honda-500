import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogActions,
  MatDialogContent,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EventDTO } from '@honda500/dtos';

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
    MatFormFieldModule
  ],
  templateUrl: './edit-modal.component.html',
  styleUrl: './edit-modal.component.scss',
})
export class EditModalComponent {
  data = inject(MAT_DIALOG_DATA) as EventDTO;

  form = new FormGroup({
    name: new FormControl(this.data.name, [
      Validators.required,
      Validators.minLength(10),
    ]),
    date: new FormControl(this.data.date, Validators.required),
  });
}
