import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BidsComponent } from './bids.component';

const routes: Routes = [{ path: '', component: BidsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BidsRoutingModule { }
