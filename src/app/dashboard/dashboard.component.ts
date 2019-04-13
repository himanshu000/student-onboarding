import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';
import { Student } from '../models/student';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  students: Student[];
  displayedColumns: string[] = [
    'sNo',
    'name',
    'category',
    'dateOfBirth',
    'fatherName',
    'motherName',
    'lastClassScore',
    'action'
  ];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private studentService: StudentService, private router: Router) { }

  ngOnInit() {
    this.studentService.getStudents().subscribe((result: Student[]) => {
      this.students = result;
      this.dataSource = new MatTableDataSource<Student>(this.students);
      this.dataSource.paginator = this.paginator;
    });
  }

  viewStudent(id) {
    this.router.navigate(['/student/view', id]);
  }

  editStudent(id) {
    this.router.navigate(['/student/edit', id]);
  }

  deleteStudent(id) {
    const index = this.students.findIndex(element => (element.id === id));
    if (index > -1) {
      this.students.splice(index, 1);
      this.dataSource = new MatTableDataSource<Student>(this.students);
      this.dataSource.paginator = this.paginator;
    }
  }
}
