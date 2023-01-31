import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TableParams } from 'src/app/models/student-data.model';
import { API_URL, StudentInfoApiService } from './student-info-api.service';
import { mockTableArray } from './table-mock';

/**
 * transforms object of params in string,
 * ignoring falsy values (except 0)
 * @param params object of possible params
 * @returns string of serialized params
 */
function serializeParams(params: TableParams) {
  return Object.entries(params)
    .filter((param) => param[1] || param[1] === 0)
    .map((param) => param.join('='))
    .flat()
    .join('&');
}

describe('StudentInfoApiService', () => {
  let service: StudentInfoApiService;
  let httpController: HttpTestingController;

  const baseParams: TableParams = {
    firstResult: 0,
    maxResults: 10,
    searchTerm: '',
    sort: 'asc',
    sortBy: 'first_name',
  };

  const paramsStr = serializeParams(baseParams);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StudentInfoApiService],
    });
    service = TestBed.inject(StudentInfoApiService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should call getStudentData and return an object with studentCount and an array of student info', (done: DoneFn) => {
    service.getStudentData(baseParams).subscribe((res) => {
      expect(res).toEqual(mockTableArray);
      done();
    });
    const req = httpController.expectOne({
      method: 'GET',
      url: `${API_URL}?${paramsStr}`,
    });

    req.flush(mockTableArray);
  });
});
