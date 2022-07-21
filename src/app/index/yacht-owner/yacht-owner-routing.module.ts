import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {YachtOwnerComponent} from "@app/index/yacht-owner/yacht-owner.component";

const routes: Routes = [
    {
        path:'',
        component: YachtOwnerComponent,
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
            },
            {
                path: 'request-service',
                loadChildren: () =>
                    import('./request-service/request-service.module').then((m) => m.RequestServiceModule),
            },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class YachtOwnerRoutingModule { }
