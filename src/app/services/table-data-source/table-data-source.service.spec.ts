import { TestBed } from '@angular/core/testing';

import { TableDataSourceService } from './table-data-source.service';

describe('TableDataSourceService', () => {
  let service: TableDataSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableDataSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
