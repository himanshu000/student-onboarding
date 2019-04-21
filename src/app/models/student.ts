import { StudentDocuments } from './student-documents';

export interface Student {
  id?: number;
  name: string;
  category: string;
  documents: StudentDocuments;
  dateOfBirth: Date;
  fatherName: string;
  motherName: string;
  lastClassScore: string;
}
