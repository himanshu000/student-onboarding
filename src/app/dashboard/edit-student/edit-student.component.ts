import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatDialog, MatDialogRef } from '@angular/material';

import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import { minMaxValueValidator } from 'src/app/shared/directives/min-max-value.directive';
import { StudentCategoryDocuments } from 'src/app/models/student-category-documents';
import { ConfirmationComponent } from 'src/app/shared/confirmation/confirmation.component';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent implements OnInit {
  id: number;
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
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
    ) {}

  ngOnInit() {
    this.buildStudentForm();

    this.route.params.subscribe(params => {
      this.student = this.studentService.students.getValue().find(student => student.id === +params.id);

      this.studentService.getDocumentsList().subscribe(doc => {

        this.setStudentCategoryValidators(doc);

        this.studentForm.controls.name.setValue(this.student.name);
        this.studentForm.controls.category.setValue(this.student.category);
        this.studentForm.controls.dateOfBirth.setValue(new Date(this.student.dateOfBirth));
        this.studentForm.controls.fatherName.setValue(this.student.fatherName);
        this.studentForm.controls.motherName.setValue(this.student.motherName);
        this.studentForm.controls.lastClassScore.setValue(this.student.lastClassScore);
        this.studentForm.controls.birthCertificate.setValue(this.student.documents.birthCertificate);
        this.studentForm.controls.domicileCertificate.setValue(this.student.documents.domicileCertificate);
        this.studentForm.controls.passport.setValue(this.student.documents.passport);
        this.studentForm.controls.policeClearance.setValue(this.student.documents.policeClearance);
        this.studentForm.controls.previousMarkSheet.setValue(this.student.documents.previousMarkSheet);
        this.studentForm.controls.signedDeclaration.setValue(this.student.documents.signedDeclaration);
      });
   });
  }

  private buildStudentForm() {
    this.studentForm = this.fb.group({
      name: [null, Validators.required],
      category: [null, Validators.required],
      dateOfBirth: [null, Validators.required],
      fatherName: [null, Validators.required],
      motherName: [null, Validators.required],
      lastClassScore: [null, [Validators.required, minMaxValueValidator(0, 100)]],
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

    this.dialogRef.componentInstance.confirmMessage = 'Are you sure you want to update?';
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.student.name = this.studentForm.value.name;
        this.student.category = this.studentForm.value.category;
        this.student.dateOfBirth = this.studentForm.value.dateOfBirth;
        this.student.fatherName = this.studentForm.value.fatherName;
        this.student.motherName = this.studentForm.value.motherName;
        this.student.lastClassScore = this.studentForm.value.lastClassScore;
        this.student.documents.birthCertificate = this.studentForm.value.birthCertificate;
        this.student.documents.domicileCertificate = this.studentForm.value.domicileCertificate;
        this.student.documents.passport = this.studentForm.value.passport;
        this.student.documents.policeClearance = this.studentForm.value.policeClearance;
        this.student.documents.previousMarkSheet = this.studentForm.value.previousMarkSheet;
        this.student.documents.signedDeclaration = this.studentForm.value.signedDeclaration;
        this.studentService.editStudentData(this.student).subscribe(data => {
          this.snackBar.open('Student updated successfully');
          this.router.navigate(['/dashboard']);
        });
      }
      this.dialogRef = null;
    });
  }
}
