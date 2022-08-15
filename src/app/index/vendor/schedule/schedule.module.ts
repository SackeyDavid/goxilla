import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleComponent } from './schedule.component';

import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plu
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import { ScheduleServiceOrderService } from './schedule-service-order.service';
import { ScheduleService } from './schedule.service';

import { ScheduleOrdersModule } from './schedule-table/schedule-orders.module';
import { ScheduleOrdersComponent } from './schedule-table/schedule-orders.component';

FullCalendarModule.registerPlugins([dayGridPlugin, resourceTimelinePlugin, interactionPlugin]);

@NgModule({
    declarations: [ScheduleComponent],
    imports: [CommonModule, ScheduleRoutingModule, FullCalendarModule, ScheduleOrdersModule],
    providers: [ScheduleServiceOrderService, ScheduleService],
    exports: [ScheduleComponent, ScheduleOrdersComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class ScheduleModule {}
