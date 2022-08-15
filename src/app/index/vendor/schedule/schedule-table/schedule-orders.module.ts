import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleOrdersComponent } from './schedule-orders.component';
import { ScheduleService } from '../schedule.service';

import { DragDropModule } from 'primeng/dragdrop';

@NgModule({
    imports: [CommonModule, DragDropModule],
    providers: [ScheduleService],
    declarations: [ScheduleOrdersComponent],
    exports: [ScheduleOrdersComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class ScheduleOrdersModule {}
