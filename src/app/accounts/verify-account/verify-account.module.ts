import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerifyAccountRoutingModule } from './verify-account-routing.module';
import { VerifyAccountComponent } from './verify-account.component';
import {NgOtpInputModule} from "@node_modules/ng-otp-input";


@NgModule({
  declarations: [
    VerifyAccountComponent
  ],
    imports: [
        CommonModule,
        VerifyAccountRoutingModule,
        NgOtpInputModule
    ]
})
export class VerifyAccountModule { }
