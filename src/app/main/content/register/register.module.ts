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
    TermsConditionsComponent
  ],
  // exports     : [
  //   RegisterComponent
  // ],
  entryComponents: [ TermsConditionsComponent ]
})
export class RegisterModule { }
