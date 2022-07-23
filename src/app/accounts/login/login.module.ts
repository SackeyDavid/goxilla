import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { AppCommonModule } from "@app/shared/common/app-common.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OAuthModule } from 'angular-oauth2-oidc';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppHttpInterceptor } from '../../services/http-interceptor';
import { ApiService } from '../../services/api.service';
import { AbpModule } from 'abp-ng2-module';
import { UtilsModule } from '@shared/utils/utils.module';
@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        LoginRoutingModule,
        AppCommonModule,
        FormsModule,
        ReactiveFormsModule,
        OAuthModule.forRoot(),
        AbpModule,
        UtilsModule
    ],
    providers: [
        ApiService, { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true }
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class LoginModule { }
