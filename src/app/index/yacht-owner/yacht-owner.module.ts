import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YachtOwnerRoutingModule } from './yacht-owner-routing.module';
import { YachtOwnerComponent } from './yacht-owner.component';
import { AddVendorComponent } from '@app/index/yacht-owner/add-vendor/add-vendor.component';
import { AppCommonModule } from '@app/shared/common/app-common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddYachtComponent } from './add-yacht/add-yacht.component';
import { AddServiceComponent } from './add-service/add-service.component';
import { AssignVendorComponent } from './assign-vendor/assign-vendor.component';
import { EditServiceRequestModalComponent } from './edit-service-request-modal/edit-service-request-modal.component';
import { MoreMenuComponent } from './more-menu/more-menu.component';

@NgModule({
    declarations: [
        YachtOwnerComponent,
        AddVendorComponent,
        AddYachtComponent,
        AddServiceComponent,
        AssignVendorComponent,
        EditServiceRequestModalComponent,
        MoreMenuComponent,
    ],
    imports: [CommonModule, YachtOwnerRoutingModule, AppCommonModule, FormsModule, ReactiveFormsModule],
})
export class YachtOwnerModule {}
