import { Component, OnInit } from '@angular/core';
import { DataFields } from '../models/student-data.model';
import { StudentInfoApiService } from '../services/student-info-api/student-info-api.service';
import { TableDataSourceService } from '../services/table-data-source/table-data-source.service';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit {
  displayedColumns: string[] = [
    'first_name',
    'last_name',
    'email',
    'phone',
    'hours_studied',
    'primary_group',
  ];

  dataSource!: TableDataSourceService;

  total = 0;

  firstResult = 0;
  maxResults = 10;
  sort = 'asc';
  sortBy: DataFields = 'first_name';
  search = '';

  constructor(private studentInfoApiService: StudentInfoApiService) {}

  ngOnInit(): void {
    this.dataSource = new TableDataSourceService(this.studentInfoApiService);
    this.dataSource.loadStudentData({
      firstResult: this.firstResult,
      maxResults: this.maxResults,
      searchTerm: this.search,
      sort: this.sort,
      sortBy: this.sortBy,
    });
  }
}
