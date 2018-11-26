import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { AlertPopupComponent } from './alert-popup/alert-popup.component';

const routes = [
  {
    path     : 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,//เรียกใช้ formgroup
    ReactiveFormsModule,//เรียกใช้ formgroup

    MatDialogModule,
    MatProgressSpinnerModule,
    // MatCheckbox,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  declarations: [
    RegisterComponent,
    TermsConditionsComponent,
    AlertPopupComponent
  ],
  entryComponents: [ TermsConditionsComponent,AlertPopupComponent ]
})
export class RegisterModule { }
