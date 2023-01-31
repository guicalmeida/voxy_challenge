import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { DataFields } from '../models/student-data.model';
import { StudentInfoApiService } from '../services/student-info-api/student-info-api.service';
import { TableDataSourceService } from '../services/table-data-source/table-data-source.service';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit, AfterViewInit, OnDestroy {
  subscriptions: Subscription[] = [];

  displayedColumns: string[] = [
    'first_name',
    'last_name',
    'email',
    'phone',
    'hours_studied',
    'primary_group',
  ];

  dataSource!: TableDataSourceService;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  total = 0;

  @ViewChild(MatSort)
  sort!: MatSort;

  search = new FormControl();

  constructor(private studentInfoApiService: StudentInfoApiService) {}

  ngOnInit(): void {
    this.dataSource = new TableDataSourceService(this.studentInfoApiService);
    this.dataSource.loadStudentData(0, 10);

    const studentCountSub = this.dataSource
      .getStudentCount()
      .subscribe((total) => {
        this.total = total;
      });

    const searchSub = this.search.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => {
        this.paginator.pageIndex = 0;
        this.loadStudentsData();
      });

    this.subscriptions.push(studentCountSub, searchSub);
  }

  ngAfterViewInit(): void {
    const sortSub = this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
      this.loadStudentsData();
    });

    const pageSub = this.paginator.page.subscribe(() => {
      this.loadStudentsData();
    });

    this.subscriptions.push(sortSub, pageSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  loadStudentsData(): void {
    this.dataSource.loadStudentData(
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.sort.direction,
      this.sort.active as DataFields,
      this.search.value
    );
  }
}
