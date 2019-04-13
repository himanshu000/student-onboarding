import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent {
  public confirmMessage: string;

  constructor(public dialogRef: MatDialogRef<ConfirmationComponent>) {}
}
