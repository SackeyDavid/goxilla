import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YachtOwnerRoutingModule } from './yacht-owner-routing.module';
import { YachtOwnerComponent } from './yacht-owner.component';
import { AppSharedModule } from '@app/shared/app-shared.module';

@NgModule({
    declarations: [YachtOwnerComponent],
    imports: [CommonModule, YachtOwnerRoutingModule, AppSharedModule],
})
export class YachtOwnerModule {}
