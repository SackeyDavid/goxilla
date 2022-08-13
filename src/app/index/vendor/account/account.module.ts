import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { AppSharedModule } from '@app/shared/app-shared.module';

@NgModule({
    declarations: [AccountComponent],
    imports: [CommonModule, AccountRoutingModule, AppSharedModule],
})
export class AccountModule {}
