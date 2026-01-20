
import { Quiz, Assignment, StudyMaterial, Grade, FeeRecord, User, UserRole } from '../types';

export const mockUsers: User[] = [
  { id: '1', username: 'student1', name: 'Ali Ahmed', role: UserRole.STUDENT, isPresent: false },
  { id: '2', username: 'student2', name: 'Sara Khan', role: UserRole.STUDENT, isPresent: true },
  { id: '3', username: 'teacher1', name: 'Dr. Fatima', role: UserRole.TEACHER },
];

export const mockQuizzes: Quiz[] = [
  { id: 'q1', title: 'Mid-term Quiz', subject: 'Anatomy', date: '2024-05-15', totalMarks: 50 },
  { id: 'q2', title: 'Weekly Assessment', subject: 'Pharmacology', date: '2024-05-20', totalMarks: 20 },
];

export const mockAssignments: Assignment[] = [
  { id: 'a1', title: 'Nervous System Report', deadline: '2024-05-22', status: 'Pending' },
  { id: 'a2', title: 'Case Study: Cardiac', deadline: '2024-05-18', status: 'Submitted' },
];

export const mockMaterials: StudyMaterial[] = [
  { id: 'm1', title: 'Human Skeleton Basics', type: 'PPT', subject: 'Anatomy' },
  { id: 'm2', title: 'Introduction to Drugs', type: 'PDF', subject: 'Pharmacology' },
  { id: 'm3', title: 'Nursing Ethics', type: 'PPT', subject: 'Nursing Foundation' },
];

export const mockGrades: Grade[] = [
  { subject: 'Anatomy', marks: 85, total: 100, percentage: 85 },
  { subject: 'Physiology', marks: 78, total: 100, percentage: 78 },
  { subject: 'Biochemistry', marks: 92, total: 100, percentage: 92 },
  { subject: 'Microbiology', marks: 65, total: 100, percentage: 65 },
];

export const mockFees: FeeRecord[] = [
  { month: 'April 2024', status: 'Paid', amount: 5000, dueDate: '2024-04-10' },
  { month: 'May 2024', status: 'Unpaid', amount: 5000, dueDate: '2024-05-10' },
  { month: 'June 2024', status: 'Unpaid', amount: 5000, dueDate: '2024-06-10' },
];
