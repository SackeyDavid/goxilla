import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { AbpModule } from 'abp-ng2-module';
import { UtilsModule } from '@shared/utils/utils.module';


@NgModule({
    declarations: [
        RegisterComponent
    ],
    imports: [
        CommonModule,
        RegisterRoutingModule,
        RegisterRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        AbpModule,
        UtilsModule
    ]
})
export class RegisterModule { }
