import {
  AfterViewInit,
  Component,
  computed,
  OnInit,
  Signal,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs';
import { IService } from './iservice';

@Component({
  standalone: false,
  template: '',
})
export abstract class TableComponent<T, TS extends IService<T>>
  implements OnInit, AfterViewInit
{
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  abstract readonly service: TS;

  abstract readonly baseColumns: Array<keyof T>;

  readonly extendedColumns?: string[];

  readonly columns: Signal<string[]> = computed(() => {
    return [
      ...(this.baseColumns as string[]),
      ...(this.extendedColumns ? this.extendedColumns : []),
    ];
  });

  readonly dataSource = new MatTableDataSource<T>([]);

  ngOnInit(): void {
    this.service
      .getData()
      .pipe(first())
      .subscribe(([data]) => {
        this.dataSource.data = data;
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
