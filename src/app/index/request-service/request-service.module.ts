import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestServiceRoutingModule } from './request-service-routing.module';
import { RequestServiceComponent } from './request-service.component';


@NgModule({
  declarations: [
    RequestServiceComponent
  ],
  imports: [
    CommonModule,
    RequestServiceRoutingModule
  ]
})
export class RequestServiceModule { }
