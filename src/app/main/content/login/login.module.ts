import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {LoginComponent} from './login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

const routes = [
  {
    path     : 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,//เรียกใช้ formgroup
    ReactiveFormsModule,//เรียกใช้ formgroup
  ],
  declarations: [
    LoginComponent
  ],
  exports     : [
    LoginComponent
  ]
})
export class LoginModule { }
