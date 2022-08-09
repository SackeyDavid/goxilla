import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from '@app/index/index.component';

const routes: Routes = [
    {
        path: '',
        component: IndexComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./yacht-owner/yacht-owner.module').then((m) => m.YachtOwnerModule),
            },
            { path: 'vendor', loadChildren: () => import('./vendor/vendor.module').then((m) => m.VendorModule) },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class IndexRoutingModule {}
