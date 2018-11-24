import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import {TermsConditionsComponent} from '../register/terms-conditions/terms-conditions.component';

@Component({
  selector: 'app-dialog-test',
  templateUrl: './dialog-test.component.html',
  styleUrls: ['./dialog-test.component.css']
})
export class DialogTestComponent implements OnInit {

  animal: string;
  name: string;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TermsConditionsComponent, {
      width: '250px',
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}
export interface DialogData {
  animal: string;
  name: string;
}
