/* import { Alert } from './components/common/alert/alert'; */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@app/shared/base.service';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
    providedIn: 'root',
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
    constructor(private httpClient: HttpClient, private baseService: BaseService, public router: Router) {}

    setStorageItem(key: any, status: any) {
        localStorage.setItem(key, JSON.stringify(status));
    }

    getStorageItem(key: string) {
        return JSON.parse(localStorage.getItem(key));
    }

    removeStorageItem(key: string) {
        localStorage.removeItem(key);
    }

    getCurrentLoginInformation() {
        return this.httpClient.get(`${this.baseService.baseUrl}/api/services/app/Session/GetCurrentLoginInformations`);
    }
    goTo(page) {
        this.router.navigate([page]);
    }
}
