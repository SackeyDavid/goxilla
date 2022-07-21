import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestServiceRoutingModule } from './request-service-routing.module';
import { RequestServiceComponent } from './request-service.component';
import { AppSharedModule } from '@app/shared/app-shared.module';

@NgModule({
    declarations: [RequestServiceComponent],
    imports: [CommonModule, RequestServiceRoutingModule, AppSharedModule],
})
export class RequestServiceModule {}
