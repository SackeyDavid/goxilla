import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YachtOwnerRoutingModule } from './yacht-owner-routing.module';
import { YachtOwnerComponent } from './yacht-owner.component';
import { AddVendorComponent } from '@app/index/yacht-owner/add-vendor/add-vendor.component';
import { AppCommonModule } from '@app/shared/common/app-common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [YachtOwnerComponent, AddVendorComponent],
    imports: [CommonModule, YachtOwnerRoutingModule, AppCommonModule, FormsModule, ReactiveFormsModule],
})
export class YachtOwnerModule {}
