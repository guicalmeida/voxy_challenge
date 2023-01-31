import { Component } from '@angular/core';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent {
  dataSource = [
    {
      id: 1,
      first_name: 'Gilbertina',
      last_name: 'Vasey',
      email: 'gvasey0@yellowbook.com',
      phone: '3412020199',
      hours_studied: 132,
      primary_group: 'Very important',
    },
  ];

  displayedColumns: string[] = [
    'first_name',
    'last_name',
    'email',
    'phone',
    'hours_studied',
    'primary_group',
  ];
}
