import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TableParams } from 'src/app/models/student-data.model';
import { API_URL, StudentInfoApiService } from './student-info-api.service';
import {
  descResultMock,
  mockTableArray,
  nonExistentMock,
  page2ResultsMock,
  singleResultMock,
} from './table-mock';

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

  it('should call getStudentData with the search term "AbAgAeL" and return an obj with studentCount = 1 and an array with a single student', (done: DoneFn) => {
    const newParams: TableParams = { ...baseParams, searchTerm: 'AbAgAeL' };
    const searchParamStr = serializeParams(newParams);

    service.getStudentData(newParams).subscribe((res) => {
      expect(res).toEqual(singleResultMock);
      done();
    });
    const req = httpController.expectOne({
      method: 'GET',
      url: `${API_URL}?${searchParamStr}`,
    });

    req.flush(singleResultMock);
  });

  it('should call getStudentData with descending order and return an object with studentCount and the array of student info reversed', (done: DoneFn) => {
    const descParams: TableParams = { ...baseParams, sort: 'desc' };
    const descParamStr = serializeParams(descParams);

    service.getStudentData(descParams).subscribe((res) => {
      expect(res).toEqual(descResultMock);
      done();
    });
    const req = httpController.expectOne({
      method: 'GET',
      url: `${API_URL}?${descParamStr}`,
    });

    req.flush(descResultMock);
  });

  it('should call getStudentData with pagination and return the second page of the object response', (done: DoneFn) => {
    const pageParams: TableParams = { ...baseParams, firstResult: 10 };
    const pageParamstr = serializeParams(pageParams);

    service.getStudentData(pageParams).subscribe((res) => {
      expect(res).toEqual(page2ResultsMock);
      done();
    });
    const req = httpController.expectOne({
      method: 'GET',
      url: `${API_URL}?${pageParamstr}`,
    });

    req.flush(page2ResultsMock);
  });

  it('should call getStudentData with nonexistent value and get 0 students', (done: DoneFn) => {
    const nonExistentTermParams: TableParams = {
      ...baseParams,
      searchTerm: 'NONEXISTENT_VALUE',
    };
    const nonExistentTermParamsStr = serializeParams(nonExistentTermParams);

    service.getStudentData(nonExistentTermParams).subscribe((res) => {
      expect(res).toEqual(nonExistentMock);
      done();
    });
    const req = httpController.expectOne({
      method: 'GET',
      url: `${API_URL}?${nonExistentTermParamsStr}`,
    });

    req.flush(nonExistentMock);
  });
});
