import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorRoutingModule } from './vendor-routing.module';
import { VendorComponent } from './vendor.component';
import { AppCommonModule } from '@app/shared/common/app-common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssignTaskComponent } from './modals/assign-task/assign-task.component';
import { MakeABidComponent } from './bids/make-a-bid/make-a-bid.component';
import { AssignTechnicianComponent } from './modals/assign-technician/assign-technician.component';
import { IncomingOrderComponent } from './modals/incoming-order/incoming-order.component';

@NgModule({
    declarations: [
        VendorComponent,
        AssignTaskComponent,
        MakeABidComponent,
        AssignTechnicianComponent,
        IncomingOrderComponent,
    ],
    imports: [CommonModule, VendorRoutingModule, AppCommonModule, FormsModule, ReactiveFormsModule],
})
export class VendorModule {}
