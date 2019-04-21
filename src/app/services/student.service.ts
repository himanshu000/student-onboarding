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
  baseUrl = './assets/students-list.json';

  documentsList: BehaviorSubject<StudentCategoryDocuments[]>;
  students: BehaviorSubject<Student[]>;

  constructor(private http: HttpClient) { }

  getDocumentsList(): Observable<StudentCategoryDocuments[]> {
    if (this.documentsList) {
      return new Observable<StudentCategoryDocuments[]>((observer) => {
        observer.next(this.documentsList.getValue());
        observer.complete();
      }).pipe(tap(data => this.documentsList.next(data)));
    } else {
      this.documentsList =  new BehaviorSubject([]);
      return this.http.get<StudentCategoryDocuments[]>('./assets/student-category-documents-list.json')
      .pipe(tap(data => this.documentsList.next(data)));
    }
  }

  getStudents(): Observable<Student[]> {
    if (this.students) {
      return new Observable<Student[]>((observer) => {
        observer.next(this.students.getValue());
        observer.complete();
      });
    } else {
      this.students = new BehaviorSubject([]);
      return this.http.get<Student[]>(this.baseUrl)
      .pipe(tap(data => this.students.next(data)));
    }
  }

  deleteStudent(id: number): Observable<Student[]> {
    return new Observable<Student[]>((observer) => {
      observer.next(this.students.getValue().filter((element) => {
        return element.id !== id;
      }));
      observer.complete();
    }).pipe(tap(data => this.students.next(data)));
  }

  editStudentData(student: Student): Observable<void> {
    return new Observable<void>((observer) => {
      const currentData = this.students.getValue();
      const foundIndex = currentData.findIndex(st => st.id === student.id);
      currentData[foundIndex] = student;
      this.students.next(currentData);
      observer.next();
      observer.complete();
    });
  }

  addStudentData(student: Student): Observable<void> {
    return new Observable<void>((observer) => {
      const currentData = this.students.getValue();
      const nextId = Math.max.apply(Math, currentData.map((o) => {
        return o.id;
      })) + 1;
      student.id = nextId;
      this.students.next([...currentData, student]);
      observer.next();
      observer.complete();
    });
  }
}
