export interface StudentData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  hours_studied: number;
  primary_group: string;
}

export type DataFields = keyof StudentData;

export interface StudentsHttpResponse {
  students: StudentData[];
  studentCount: number;
}

export interface TableParams {
  firstResult: number;
  maxResults: number;
  sort: string;
  sortBy: DataFields;
  searchTerm: string;
}
