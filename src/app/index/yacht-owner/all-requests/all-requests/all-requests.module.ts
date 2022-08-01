import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllRequestsRoutingModule } from './all-requests-routing.module';
import { AllRequestsComponent } from './all-requests.component';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [AllRequestsComponent],
    imports: [CommonModule, AllRequestsRoutingModule, AppSharedModule, ReactiveFormsModule],
})
export class AllRequestsModule {}
