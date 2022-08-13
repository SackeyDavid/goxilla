import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { ScheduleModule } from '../schedule/schedule.module';
import { ScheduleServiceOrderService } from '../schedule/schedule-service-order.service';
import { ScheduleService } from '../schedule/schedule.service';

@NgModule({
    declarations: [DashboardComponent],
    imports: [CommonModule, DashboardRoutingModule, AppSharedModule, ScheduleModule],
    providers: [ScheduleServiceOrderService, ScheduleService],
})
export class DashboardModule {}
