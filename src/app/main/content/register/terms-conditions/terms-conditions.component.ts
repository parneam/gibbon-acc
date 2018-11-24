import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.css']
})
export class TermsConditionsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TermsConditionsComponent>) {
  }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close('Dialog has been closed!');
  }

}
