import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { Member } from '@honda500/dtos';
import { TableComponent } from '../shared/table.component';
import { MembersService } from './members.service';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    DatePipe,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
  ],
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss',
})
export class MembersComponent extends TableComponent<Member, MembersService> {
  service = inject(MembersService);
  readonly baseColumns: Array<keyof Member> = [
    'name',
    'nationalId',
    'familyPhone',
    'plate',
    'province',
    'requestedDate',
  ];

  override extendedColumns = ['invites'];
}
