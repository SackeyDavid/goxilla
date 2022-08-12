import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpenOrdersRoutingModule } from './open-orders-routing.module';
import { OpenOrdersComponent } from './open-orders.component';


@NgModule({
  declarations: [
    OpenOrdersComponent
  ],
  imports: [
    CommonModule,
    OpenOrdersRoutingModule
  ]
})
export class OpenOrdersModule { }
