import { MatRowDef } from '@angular/material/table';
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { of } from 'rxjs';
import { AppModule } from '../app.module';
import { StudentInfoApiService } from '../services/student-info-api/student-info-api.service';
import { mockTableArray } from '../services/student-info-api/table-mock';
import { DataTableComponent } from './data-table.component';

describe('data-table component', () => {
  beforeEach(() => {
    return MockBuilder(DataTableComponent, AppModule).mock(
      StudentInfoApiService,
      { getStudentData: () => of(mockTableArray) }
    );
  });

  it('binds dataSource', () => {
    const targetComponent =
      MockRender(DataTableComponent).point.componentInstance;

    const tableEl = ngMocks.reveal(['mat-table']);

    expect(ngMocks.input(tableEl, 'dataSource')).toBe(
      targetComponent.dataSource
    );
  });

  it('renders the right columns', () => {
    const targetComponent =
      MockRender(DataTableComponent).point.componentInstance;
    const tableEl = ngMocks.reveal(['mat-table']);

    const row = ngMocks.findInstance(tableEl, MatRowDef);
    expect(row.columns).toBe(targetComponent.displayedColumns);
  });
});
