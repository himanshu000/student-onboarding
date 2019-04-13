import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StudentCategoryDocuments } from '../models/student-category-documents';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  baseUrl = '/assets/students-list.json';

  documentsList: BehaviorSubject<StudentCategoryDocuments[]> = new BehaviorSubject([]);
  students: BehaviorSubject<Student[]> = new BehaviorSubject([]);

  constructor(private http: HttpClient) { }

  getDocumentsList(): Observable<StudentCategoryDocuments[]> {
    return this.http.get<StudentCategoryDocuments[]>('/assets/student-category-documents-list.json')
    .pipe(tap(data => this.documentsList.next(data)));
  }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.baseUrl)
    .pipe(tap(data => this.students.next(data)));
  }
}
