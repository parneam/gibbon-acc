import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DialogTestComponent} from './dialog-test.component';
import {RouterModule} from '@angular/router';
import {MatDialogModule} from '@angular/material';

const routes = [
  {
    path     : 'dialogTest',
    component: DialogTestComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    MatDialogModule
  ],
  declarations: [DialogTestComponent],
  exports     : [
    DialogTestComponent
  ]
})
export class DialogTestModule { }
