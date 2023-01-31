import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  StudentsHttpResponse,
  TableParams,
} from 'src/app/models/student-data.model';

export const API_URL = 'http://localhost:5741/api';

@Injectable({
  providedIn: 'root',
})
export class StudentInfoApiService {
  constructor(private http: HttpClient) {}

  public getStudentData(params: TableParams): Observable<StudentsHttpResponse> {
    const queryParams = this.appendQueryParams(params);

    return this.http.get<StudentsHttpResponse>(API_URL, {
      params: queryParams,
    });
  }

  private appendQueryParams(params: TableParams) {
    let queryParams = new HttpParams();
    Object.entries(params).forEach((param) => {
      if (param[1] || param[1] === 0) {
        queryParams = queryParams.append(param[0], param[1]);
      }
    });
    return queryParams;
  }
}
