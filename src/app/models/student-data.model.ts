export interface StudentData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  hours_studied: number;
  primary_group: string;
}

export interface StudentsHttpResponse {
  students: StudentData[];
  studentCount: number;
}
