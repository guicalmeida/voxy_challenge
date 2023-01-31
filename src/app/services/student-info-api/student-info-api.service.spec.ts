import { TestBed } from '@angular/core/testing';

import { StudentInfoApiService } from './student-info-api.service';

describe('StudentInfoApiService', () => {
  let service: StudentInfoApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentInfoApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
