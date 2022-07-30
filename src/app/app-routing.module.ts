import { NgModule } from '@angular/core';
import { NavigationEnd, RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from './shared/common/auth/auth-route-guard';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrderDetailComponent } from './index/yacht-owner/order-detail/order-detail.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AppComponent,
                // canActivate: [AppRouteGuard],
                // canActivateChild: [AppRouteGuard],
                children: [
                    {
                        path: 'app',
                        loadChildren: () => import('./index/index.module').then((m) => m.IndexModule), //Lazy load admin module
                        data: { preload: true },
                    },
                    {
                        path: 'account',
                        loadChildren: () => import('./accounts/accounts.module').then((m) => m.AccountsModule),
                    },
                    {
                        path: 'service-request/:id',
                        component: OrderDetailComponent,
                        // loadChildren: () =>
                        //     import('./index/yacht-owner/order-detail/order-detail.module').then(
                        //         (m) => m.OrderDetailModule
                        //     ),
                    },
                    {
                        path: '**',
                        pathMatch: 'full',
                        redirectTo: '/account/login',
                    },
                ],
            },
        ]),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {
    constructor(private router: Router, private spinnerService: NgxSpinnerService) {
        router.events.subscribe((event) => {
            if (event instanceof RouteConfigLoadStart) {
                spinnerService.show();
            }

            if (event instanceof RouteConfigLoadEnd) {
                spinnerService.hide();
            }

            if (event instanceof NavigationEnd) {
                document.querySelector('meta[property=og\\:url').setAttribute('content', window.location.href);
            }
        });
    }
}
