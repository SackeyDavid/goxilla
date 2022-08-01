import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllRequestsComponent } from './all-requests.component';

const routes: Routes = [{ path: '', component: AllRequestsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllRequestsRoutingModule { }
