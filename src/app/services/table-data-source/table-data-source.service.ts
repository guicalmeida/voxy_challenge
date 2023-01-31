import { DataSource } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject, Subscription } from 'rxjs';
import { StudentData } from 'src/app/models/student-data.model';
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
  loadStudentData(): void {
    const infoSub = this.studentInfoApiService
      .getStudentData()
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
