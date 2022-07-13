import { Injectable } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class IndexService {
    menu = [
        {
            img: 'assets/images/yacht-watch-logo-sm.png',
            url: '/app/dashboard',
            title: 'HOME'
        },
        {
            img: 'assets/images/button.svg',
            url: '/app/request-service',
            title: 'REQUEST SERVICE'
        },
        {
            img: 'assets/images/calendar.png',
            url: '/app/calendar',
            title: 'CALENDAR'
        },
        {
            img: 'assets/images/yacht-quick.svg',
            url: '/app/yatchs',
            title: 'MY YACHTS'
        },
        {
            img: 'assets/images/settings.png',
            url: '/app/settings',
            title: 'SETTINGS'
        },
        {
            img: 'assets/images/menu.png',
            url: '/app/more',
            title: 'MORE'
        }
    ];

    activeMenu:string = '';

    constructor(
        private router: Router,
    ) { 
        this.router.events.subscribe((event: RouterEvent) => {
            this.activeMenu = event.url;
            console.log(this.activeMenu);
          })

    }
}
