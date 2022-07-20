import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';
import { AppSharedModule } from '@app/shared/app-shared.module';

@NgModule({
    declarations: [IndexComponent],
    imports: [CommonModule, IndexRoutingModule, AppSharedModule],
})
export class IndexModule {}
