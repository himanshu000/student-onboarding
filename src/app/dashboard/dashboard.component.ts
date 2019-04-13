import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';

import {MatPaginator, MatTableDataSource, MatDialog, MatDialogRef} from '@angular/material';

import { StudentService } from '../services/student.service';
import { Student } from '../models/student';
import { ConfirmationComponent } from '../shared/confirmation/confirmation.component';

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
  dialogRef: MatDialogRef<ConfirmationComponent>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private studentService: StudentService, private router: Router, private dialog: MatDialog) { }

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
    this.dialogRef = this.dialog.open(ConfirmationComponent, {
      disableClose: false
    });

    this.dialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.studentService.deleteStudent(id).subscribe((data) => {
          this.students = data;
          this.dataSource = new MatTableDataSource<Student>(this.students);
          this.dataSource.paginator = this.paginator;
        });
      }
      this.dialogRef = null;
    });
  }
}
