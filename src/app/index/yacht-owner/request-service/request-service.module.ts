import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestServiceRoutingModule } from './request-service-routing.module';
import { RequestServiceComponent } from './request-service.component';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [RequestServiceComponent],
    imports: [
        CommonModule,
        RequestServiceRoutingModule,
        AppSharedModule,
        ReactiveFormsModule
    ]
})
export class RequestServiceModule { }
