import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ResetAccountComponent} from "@app/accounts/reset-account/reset-account.component";

const routes: Routes = [
    {
        path: '',
        component: ResetAccountComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResetAccountRoutingModule { }
