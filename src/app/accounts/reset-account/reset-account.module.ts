import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetAccountRoutingModule } from './reset-account-routing.module';
import { ResetAccountComponent } from './reset-account.component';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        ResetAccountComponent
    ],
    imports: [
        CommonModule,
        ResetAccountRoutingModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class ResetAccountModule { }
