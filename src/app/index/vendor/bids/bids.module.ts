import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BidsRoutingModule } from './bids-routing.module';
import { BidsComponent } from './bids.component';


@NgModule({
  declarations: [
    BidsComponent
  ],
  imports: [
    CommonModule,
    BidsRoutingModule
  ]
})
export class BidsModule { }
