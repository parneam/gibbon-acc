import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShopsComponent} from './shops.component';
import {RouterModule} from '@angular/router';

const routes = [
  {
    path     : 'shops',
    component: ShopsComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    ShopsComponent
  ],
  exports     : [
    ShopsComponent
  ]
})
export class ShopsModule { }
