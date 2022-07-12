import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class IndexService {
    menu = [
        {
            img: 'assets/images/yacht-watch-logo-sm.png',
            title: 'HOME'
        },
        {
            img: 'assets/images/button.svg',
            title: 'REQUEST SERVICE'
        },
        {
            img: 'assets/images/calendar.png',
            title: 'CALENDAR'
        },
        {
            img: 'assets/images/yacht-quick.svg',
            title: 'MY YACHTS'
        },
        {
            img: 'assets/images/settings.png',
            title: 'SETTINGS'
        },
        {
            img: 'assets/images/menu.png',
            title: 'MORE'
        }
    ];
    constructor() { }
}
