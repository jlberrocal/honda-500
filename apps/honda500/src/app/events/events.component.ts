import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { EditEventDTO, EventDTO } from '@honda500/dtos';
import { exhaustMap, filter, first, map } from 'rxjs';
import { TableComponent } from '../shared/table.component';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { EventsService } from './events.service';

@Component({
  selector: 'app-events',
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
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
})
export class EventsComponent extends TableComponent<EventDTO, EventsService> {
  service = inject(EventsService);
  dialog = inject(MatDialog);
  router = inject(Router);
  route = inject(ActivatedRoute);

  readonly baseColumns: Array<keyof EventDTO> = ['name', 'date', 'members'];
  override extendedColumns = ['actions'];

  openEditModal(row: EventDTO, event: MouseEvent) {
    event.stopPropagation();
    const ref = this.dialog.open<
      EditModalComponent,
      EventDTO,
      EditEventDTO | null
    >(EditModalComponent, {
      data: row,
      minHeight: '200px',
      minWidth: '600px',
    });

    ref
      .afterClosed()
      .pipe(
        first(),
        filter((resp) => resp !== null && resp !== undefined),
        exhaustMap((editted: EditEventDTO) =>
          this.service.editEvent(row.id!, editted).pipe(
            first(),
            map((resp) => (resp.affected === 1 ? editted : null))
          )
        )
      )
      .subscribe((editted) => {
        if (editted) {
          this.dataSource.data.forEach((item) => {
            if (row.id === item.id) {
              item.date = editted.date;
              item.name = editted.name;
            }
          });
        }
      });
  }

  openEvent(id: number) {
    this.router.navigate([id], { relativeTo: this.route });
  }
}
