import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AccountsComponent} from "@app/accounts/accounts.component";

const routes: Routes = [
    {
        path: '',
        component: AccountsComponent,
        children: [
            {
                path: 'register',
                loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
            },
            {
                path: 'login',
                loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
            },
            {
                path: 'reset-account',
                loadChildren: () => import('./reset-account/reset-account.module').then(m => m.ResetAccountModule)
            },
            {
                path: 'new-password',
                loadChildren: () => import('./new-password/new-password.module').then(m => m.NewPasswordModule)
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
