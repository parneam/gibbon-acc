import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from '../login/login.component';
import {MailConfirmComponent} from './mail-confirm.component';
import {RouterModule} from '@angular/router';

const routes = [
  {
    path     : 'mail-confirm',
    component: MailConfirmComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    MailConfirmComponent
  ],
  exports     : [
    MailConfirmComponent
  ]
})
export class MailConfirmModule { }
