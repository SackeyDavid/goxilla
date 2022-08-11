import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorRoutingModule } from './vendor-routing.module';
import { VendorComponent } from './vendor.component';
import { AppCommonModule } from '@app/shared/common/app-common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [VendorComponent],
    imports: [CommonModule, VendorRoutingModule, AppCommonModule, FormsModule, ReactiveFormsModule],
})
export class VendorModule {}
