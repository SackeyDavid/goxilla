import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsComponent } from './accounts.component';
import {NgOtpInputModule} from "@node_modules/ng-otp-input";


@NgModule({
  declarations: [
    AccountsComponent
  ],
    imports: [
        CommonModule,
        AccountsRoutingModule,
        NgOtpInputModule
    ]
})
export class AccountsModule { }
