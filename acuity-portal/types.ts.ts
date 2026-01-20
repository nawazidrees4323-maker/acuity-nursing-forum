
export enum UserRole {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER'
}

export interface User {
  id: string;
  username: string;
  name: string;
  role: UserRole;
  isPresent?: boolean;
}

export interface Quiz {
  id: string;
  title: string;
  subject: string;
  date: string;
  totalMarks: number;
}

export interface Assignment {
  id: string;
  title: string;
  deadline: string;
  status: 'Pending' | 'Submitted';
}

export interface StudyMaterial {
  id: string;
  title: string;
  type: 'PPT' | 'PDF' | 'DOC';
  subject: string;
}

export interface Grade {
  subject: string;
  marks: number;
  total: number;
  percentage: number;
}

export interface FeeRecord {
  month: string;
  status: 'Paid' | 'Unpaid';
  amount: number;
  dueDate: string;
}
