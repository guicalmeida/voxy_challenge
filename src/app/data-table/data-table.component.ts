import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
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
  firstResult = 0;
  maxResults = 10;

  constructor(private studentInfoApiService: StudentInfoApiService) {}

  ngOnInit(): void {
    this.dataSource = new TableDataSourceService(this.studentInfoApiService);
    this.dataSource.loadStudentData(this.firstResult, this.maxResults);

    const studentCountSub = this.dataSource
      .getStudentCount()
      .subscribe((total) => {
        this.total = total;
      });

    this.subscriptions.push(studentCountSub);
  }

  ngAfterViewInit(): void {
    const pageSub = this.paginator.page.subscribe(() => {
      this.loadStudentsData();
    });
    this.subscriptions.push(pageSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  loadStudentsData() {
    this.dataSource.loadStudentData(
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }
}
