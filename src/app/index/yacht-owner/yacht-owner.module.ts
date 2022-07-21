import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YachtOwnerRoutingModule } from './yacht-owner-routing.module';
import { YachtOwnerComponent } from './yacht-owner.component';


@NgModule({
  declarations: [
    YachtOwnerComponent
  ],
  imports: [
    CommonModule,
    YachtOwnerRoutingModule
  ]
})
export class YachtOwnerModule { }
