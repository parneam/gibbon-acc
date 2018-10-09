import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import {ProfileComponent} from './profile.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RegisterComponent} from './register.component';

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
    ReactiveFormsModule//เรียกใช้ formgroup
  ],
  declarations: [
    RegisterComponent
  ],
  exports     : [
    RegisterComponent
  ]
})
export class RegisterModule { }
