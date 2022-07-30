import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderDetailRoutingModule } from './order-detail-routing.module';
import { OrderDetailComponent } from './order-detail.component';
import { AppSharedModule } from '@app/shared/app-shared.module';

@NgModule({
    declarations: [OrderDetailComponent],
    imports: [CommonModule, OrderDetailRoutingModule, AppSharedModule],
})
export class OrderDetailModule {}
