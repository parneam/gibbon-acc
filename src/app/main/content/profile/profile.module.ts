import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileComponent} from './profile.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

const routes = [
  {
    path     : 'profile/:id',
    component: ProfileComponent
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
    ProfileComponent
  ],
  exports     : [
    ProfileComponent
  ]
})
export class ProfileModule { }
