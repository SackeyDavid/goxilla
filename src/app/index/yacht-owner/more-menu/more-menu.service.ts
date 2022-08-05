import { Injectable } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class MoreMenuService {
    more_menu = [
        {
            img: 'assets/images/menu-icons/yacht-watch-logo.png',
            url: '/app/dashboard',
            title: 'Home',
            img_size: '60px',
        },
        {
            img: 'assets/images/menu-icons/request-button.png',
            url: '/app/request-service',
            title: 'Request Service',
            img_size: '60px',
        },
        {
            img: 'assets/images/menu-icons/stats-icon.svg',
            url: '/app/dashboard',
            title: 'Yacht Vitals',
            img_size: '80px',
        },
        {
            img: 'assets/images/menu-icons/open-orders-icon.svg',
            url: '/app/dashboard',
            title: 'Open Orders',
            img_size: '50px',
        },
        {
            img: 'assets/images/menu-icons/invoices-icon.svg',
            url: '/app/dashboard',
            title: 'Invoices',
            img_size: '50px',
        },
        {
            img: 'assets/images/menu-icons/weather-icon.svg',
            url: '/app/dashboard',
            title: 'Weather',
            img_size: '50px',
        },
        {
            img: 'assets/images/menu-icons/messages.svg',
            url: '/app/dashboard',
            title: 'Messages',
            img_size: '60px',
        },
        {
            img: 'assets/images/menu-icons/live-view-icon.svg',
            url: '/app/dashboard',
            title: 'Live View',
            img_size: '60px',
        },
        {
            img: 'assets/images/menu-icons/shipshape-icon.svg',
            url: '/app/dashboard',
            title: 'Shipshape',
            img_size: '60px',
        },
        {
            img: 'assets/images/menu-icons/bundle-icon.svg',
            url: '/app/dashboard',
            title: 'Bundle',
            img_size: '60px',
        },
        {
            img: 'assets/images/menu-icons/finance-icon.svg',
            url: '/app/dashboard',
            title: 'Finance',
            img_size: '60px',
        },
        {
            img: 'assets/images/menu-icons/live-location-icon.svg',
            url: '/app/dashboard',
            title: 'Live Location',
            img_size: '60px',
        },
        {
            img: 'assets/images/menu-icons/manager-icon.svg',
            url: '/app/dashboard',
            title: 'Yacht Manager',
            img_size: '60px',
        },
        {
            img: 'assets/images/menu-icons/settings-icon.svg',
            url: '/app/dashboard',
            title: 'Settings',
            img_size: '60px',
        },
        {
            img: 'assets/images/menu-icons/service-orders.svg',
            url: '/app/service-orders',
            title: 'Service Orders',
            img_size: '50px',
        },
        {
            img: 'assets/images/menu-icons/yacht-profile-icon.svg',
            url: '/app/dashboard',
            title: 'Yacht Profile',
            img_size: '60px',
        },
        {
            img: 'assets/images/menu-icons/calendar-icon.svg',
            url: '/app/dashboard',
            title: 'Calendar',
            img_size: '60px',
        },
        {
            img: 'assets/images/menu-icons/yacht-icon.svg',
            url: '/app/dashboard',
            title: 'My Yachts',
            img_size: '60px',
        },
        {
            img: 'assets/images/menu-icons/captain-icon.svg',
            url: '/app/dashboard',
            title: "Captain's Corner",
            img_size: '60px',
        },
    ];

    menu_mobile = [
        {
            img: 'assets/images/menu-icons/mobile/yacht-watch-logo-sm.png',
            url: '/app/dashboard',
            title: 'HOME',
            icon_width: '8',
        },
        {
            img: 'assets/images/menu-icons/mobile/messages.svg',
            url: '/app/messages',
            title: 'MESSAGES',
            icon_width: '8',
        },
        {
            img: 'assets/images/menu-icons/mobile/request-button.png',
            url: '/app/request-service',
            title: 'REQUEST SERVICE',
            icon_width: '12',
        },
        {
            img: 'assets/images/menu-icons/mobile/calendar.svg',
            url: '/app/calendar',
            title: 'CALENDAR',
            icon_width: '8',
        },
        {
            img: 'assets/images/menu-icons/mobile/menu.svg',
            url: '/app/more',
            title: 'MORE',
            icon_width: '8',
        },
    ];

    activeMenu: string = '';

    constructor(private router: Router) {
        this.router.events.subscribe((event: RouterEvent) => {
            this.activeMenu = event.url;
        });
    }
}
