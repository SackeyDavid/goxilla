/* import { Alert } from './components/common/alert/alert'; */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    key = 'sentinel-clock-in-status';
    tripKey = 'sentinel-startTrip';
    jobKey = 'sentinel-job-key';
    tripSubject = new Subject<boolean>();
    clockSubject = new Subject<boolean>();
    fuelSubject = new Subject<boolean>();
    collapseMenuSubject = new Subject<boolean>();
    uploadMediaSubject = new Subject<boolean>();
    /* alertSubject = new Subject<Alert>(); */
    constructor(
        public router: Router,
    ) { }

    setStorageItem(key: any, status: any) {
        localStorage.setItem(key, JSON.stringify(status));
    }

    getStorageItem(key: string) {
        return JSON.parse(localStorage.getItem(key));
    }

    removeStorageItem(key: string) {
        localStorage.removeItem(key);
    }

    goTo(page) {
        this.router.navigate([page]);
    }

}
