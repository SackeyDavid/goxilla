import { Injectable } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class VendorService {
    menu = [
        {
            img: 'assets/images/yacht-watch-logo-sm.png',
            url: '/app/vendor/dashboard',
            title: 'HOME',
        },
        {
            img: 'assets/images/menu-icons/calendar-icon.svg',
            url: '/app/vendor/schedule',
            title: 'SCHEDULE',
        },
        {
            img: 'assets/images/menu-icons/open-orders-icon.svg',
            url: '/app/vendor/open-orders',
            title: 'OPEN ORDERS',
        },
        {
            img: 'assets/images/menu-icons/bid-icon.svg',
            url: '/app/vendor/bids',
            title: 'BIDS',
        },
        {
            img: 'assets/images/menu-icons/customer-icon.svg',
            url: '/app/vendor/invoices',
            title: 'CUSTOMERS',
        },
        {
            img: 'assets/images/menu-icons/team-icon.svg',
            url: '/app/vendor/invoices',
            title: 'MY TEAM',
        },
        {
            img: 'assets/images/menu-icons/settings-icon.svg',
            url: '/app/vendor/account',
            title: 'SETTINGS',
        },
        {
            img: 'assets/images/menu-icons/finance-icon.svg',
            url: '/app/vendor/settings',
            title: 'FINANCES',
        },
    ];

    activeMenu: string = '';

    constructor(private router: Router) {
        this.router.events.subscribe((event: RouterEvent) => {
            this.activeMenu = event.url;
        });
    }
}
