import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { ScheduleModule } from '../schedule/schedule.module';

@NgModule({
    declarations: [DashboardComponent],
    imports: [CommonModule, DashboardRoutingModule, AppSharedModule, ScheduleModule],
})
export class DashboardModule {}
