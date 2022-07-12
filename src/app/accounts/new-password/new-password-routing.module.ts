import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NewPasswordComponent} from "@app/accounts/new-password/new-password.component";

const routes: Routes = [
    {
        path: '',
        component: NewPasswordComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewPasswordRoutingModule { }
