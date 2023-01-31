import { DataSource } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject, Subscription } from 'rxjs';
import {
  DataFields,
  StudentData,
  TableParams,
} from 'src/app/models/student-data.model';
import { StudentInfoApiService } from '../student-info-api/student-info-api.service';

@Injectable({
  providedIn: 'root',
})
export class TableDataSourceService implements DataSource<StudentData> {
  // properties encharged of emitting new values coming from API
  private studentDataSubject = new BehaviorSubject<StudentData[]>([]);
  private studentsCountSubject = new Subject<number>();

  private subscriptions: Subscription[] = [];

  constructor(private studentInfoApiService: StudentInfoApiService) {}

  // default dataSource method
  connect(): Observable<StudentData[]> {
    return this.studentDataSubject.asObservable();
  }

  disconnect(): void {
    this.studentDataSubject.complete();
    this.studentsCountSubject.complete();
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  /**
   * method responsible for populating subjects with incoming data
   */
  loadStudentData({
    firstResult: pageIndex = 0,
    maxResults = 25,
    sort = 'asc',
    sortBy = 'first_name',
    searchTerm = '',
  }: TableParams): void {
    const firstResult = pageIndex * maxResults;

    const infoSub = this.studentInfoApiService
      .getStudentData({
        firstResult,
        maxResults,
        sort,
        sortBy,
        searchTerm,
      })
      .pipe(
        map((data) => {
          this.studentsCountSubject.next(data.studentCount);
          return data.students;
        })
      )
      .subscribe({
        next: (studentData) => this.studentDataSubject.next(studentData),
        error: (error) => console.error(error),
      });

    this.subscriptions.push(infoSub);
  }
}
