import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorComponent } from './vendor.component';

const routes: Routes = [
    {
        path: '',
        component: VendorComponent,
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
            },
            {
                path: 'schedule',
                loadChildren: () => import('./schedule/schedule.module').then((m) => m.ScheduleModule),
            },
            {
                path: 'open-orders',
                loadChildren: () => import('./open-orders/open-orders.module').then((m) => m.OpenOrdersModule),
            },
            { path: 'bids', loadChildren: () => import('./bids/bids.module').then((m) => m.BidsModule) },
            { path: 'account', loadChildren: () => import('./account/account.module').then((m) => m.AccountModule) },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class VendorRoutingModule {}
