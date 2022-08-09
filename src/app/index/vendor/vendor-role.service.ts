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
            img: 'assets/images/menu-icons/finance-icon.svg',
            url: '/app/vendor/finance',
            title: 'FINANCES',
        },
        {
            img: 'assets/images/menu-icons/weather-icon.svg',
            url: '/app/vendor/weather',
            title: 'WEATHER',
        },
        {
            img: 'assets/images/menu-icons/invoices-icon.svg',
            url: '/app/vendor/invoices',
            title: 'INVOICES',
        },
        {
            img: 'assets/images/menu-icons/settings-icon.svg',
            url: '/app/vendor/settings',
            title: 'SETTINGS',
        },
    ];

    activeMenu: string = '';

    constructor(private router: Router) {
        this.router.events.subscribe((event: RouterEvent) => {
            this.activeMenu = event.url;
        });
    }
}
