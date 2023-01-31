import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentsHttpResponse } from 'src/app/models/student-data.model';

export const API_URL = 'http://localhost:5741/api';

@Injectable({
  providedIn: 'root',
})
export class StudentInfoApiService {
  constructor(private http: HttpClient) {}

  public getStudentData(): Observable<StudentsHttpResponse> {
    return this.http.get<StudentsHttpResponse>(API_URL);
  }
}
