import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { StudentCategoryDocuments } from 'src/app/models/student-category-documents';
import { MatSnackBar, MatDialog, MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/models/student';
import { ConfirmationComponent } from 'src/app/shared/confirmation/confirmation.component';
import { minMaxValueValidator } from 'src/app/shared/directives/min-max-value.directive';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {
  student: Student;
  studentForm: FormGroup;
  dialogRef: MatDialogRef<ConfirmationComponent>;

  categories = [
    {value: 'domestic', viewValue: 'Domestic'},
    {value: 'international', viewValue: 'International'}
  ];

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
    ) {}

  ngOnInit() {
    this.buildStudentForm();
    this.studentService.getDocumentsList().subscribe(doc => {
      this.setStudentCategoryValidators(doc);
    });
  }

  private buildStudentForm() {
    this.studentForm = this.fb.group({
      name: [null, Validators.required],
      category: [null, Validators.required],
      dateOfBirth: [null, Validators.required],
      fatherName: [null, Validators.required],
      motherName: [null, Validators.required],
      lastClassScore: [null, [Validators.required, minMaxValueValidator(60, 100)]],
      domicileCertificate: [null],
      birthCertificate: [null],
      previousMarkSheet: [null],
      policeClearance: [null],
      passport: [null],
      signedDeclaration: [null]
    });
  }

  private setStudentCategoryValidators(doc: StudentCategoryDocuments[]) {
    const domicileCertificate = this.studentForm.get('domicileCertificate');
    const birthCertificate = this.studentForm.get('birthCertificate');
    const previousMarkSheet = this.studentForm.get('previousMarkSheet');
    const policeClearance = this.studentForm.get('policeClearance');
    const passport = this.studentForm.get('passport');
    const signedDeclaration = this.studentForm.get('signedDeclaration');
    this.studentForm.get('category').valueChanges.subscribe(studentCategory => {
      const domestic = doc.find(d => d.category === 'domestic');
      const international = doc.find(d => d.category === 'international');
      if (studentCategory === domestic.category) {
        this.setDomicileCertificateValidator(domestic, domicileCertificate);
        this.setBirthCertificateValidator(domestic, birthCertificate);
        this.setPreviousMarksheetValidator(domestic, previousMarkSheet);
        this.setPoliceClearanceValidator(domestic, policeClearance);
        this.setPassportValidator(domestic, passport);
        this.setSignedDeclarationValidator(domestic, signedDeclaration);
      }
      if (studentCategory === international.category) {
        this.setDomicileCertificateValidator(international, domicileCertificate);
        this.setBirthCertificateValidator(international, birthCertificate);
        this.setPreviousMarksheetValidator(international, previousMarkSheet);
        this.setPoliceClearanceValidator(international, policeClearance);
        this.setPassportValidator(international, passport);
        this.setSignedDeclarationValidator(international, signedDeclaration);
      }
      domicileCertificate.updateValueAndValidity();
      birthCertificate.updateValueAndValidity();
      previousMarkSheet.updateValueAndValidity();
      policeClearance.updateValueAndValidity();
      passport.updateValueAndValidity();
      signedDeclaration.updateValueAndValidity();
    });
  }

  private setDomicileCertificateValidator(category: StudentCategoryDocuments, domicileCertificate) {
    if (category.documents.includes('domicileCertificate')) {
      domicileCertificate.setValidators([Validators.requiredTrue]);
    } else {
      domicileCertificate.setValidators(null);
    }
  }

  private setBirthCertificateValidator(category: StudentCategoryDocuments, birthCertificate) {
    if (category.documents.includes('birthCertificate')) {
      birthCertificate.setValidators([Validators.requiredTrue]);
    } else {
      birthCertificate.setValidators(null);
    }
  }

  private setPreviousMarksheetValidator(category: StudentCategoryDocuments, previousMarkSheet) {
    if (category.documents.includes('previousMarkSheet')) {
      previousMarkSheet.setValidators([Validators.requiredTrue]);
    } else {
      previousMarkSheet.setValidators(null);
    }
  }

  private setPoliceClearanceValidator(category: StudentCategoryDocuments, policeClearance) {
    if (category.documents.includes('policeClearance')) {
      policeClearance.setValidators([Validators.requiredTrue]);
    } else {
      policeClearance.setValidators(null);
    }
  }

  private setPassportValidator(category: StudentCategoryDocuments, passport) {
    if (category.documents.includes('passport')) {
      passport.setValidators([Validators.requiredTrue]);
    } else {
      passport.setValidators(null);
    }
  }

  private setSignedDeclarationValidator(category: StudentCategoryDocuments, signedDeclaration) {
    if (category.documents.includes('signedDeclaration')) {
      signedDeclaration.setValidators([Validators.requiredTrue]);
    } else {
      signedDeclaration.setValidators(null);
    }
  }

  back() {
    this.router.navigate(['/dashboard']);
  }

  onSubmit() {
    this.dialogRef = this.dialog.open(ConfirmationComponent, {
      disableClose: false
    });

    this.dialogRef.componentInstance.confirmMessage = 'Are you sure you want to add?';
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.student = {
          name: this.studentForm.value.name,
          category: this.studentForm.value.category,
          dateOfBirth: this.studentForm.value.dateOfBirth,
          fatherName: this.studentForm.value.fatherName,
          motherName: this.studentForm.value.motherName,
          lastClassScore: this.studentForm.value.lastClassScore,
          documents: {
            birthCertificate: this.studentForm.value.birthCertificate,
            domicileCertificate: this.studentForm.value.domicileCertificate,
            passport: this.studentForm.value.passport,
            policeClearance: this.studentForm.value.policeClearance,
            previousMarkSheet: this.studentForm.value.previousMarkSheet,
            signedDeclaration: this.studentForm.value.signedDeclaration
          }
        };
        this.studentService.addStudentData(this.student).subscribe(data => {
          this.snackBar.open('Student added successfully');
          this.router.navigate(['/dashboard']);
        });
      }
      this.dialogRef = null;
    });
  }
}
