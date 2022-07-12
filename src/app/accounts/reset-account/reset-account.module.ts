import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetAccountRoutingModule } from './reset-account-routing.module';
import { ResetAccountComponent } from './reset-account.component';


@NgModule({
  declarations: [
    ResetAccountComponent
  ],
  imports: [
    CommonModule,
    ResetAccountRoutingModule
  ]
})
export class ResetAccountModule { }
