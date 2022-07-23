import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class BaseService {
    baseUrl = environment.baseURL;
    vendorData = 'yatchwatch-static-12345678755';
    vendorSource = new Subject<number>();
    vendorListSource = new Subject<any>();

    public config = {
        allowNumbersOnly: true,
        length: 4,
        isPasswordInput: false,
        disableAutoFocus: false,
        placeholder: '',
        inputClass: 'otp-border-radius outline-none',
        inputStyles: { width: '50px', height: '50px' },
    };
    constructor() {}

    getSession(key: any): any {
        if (localStorage.getItem(key)) {
            return JSON.parse(localStorage.getItem(key) as string);
        }
        return false;
    }

    setSession(key: any, data: any): void {
        localStorage.setItem(key, JSON.stringify(data));
    }

    removeSession(key: any): void {
        localStorage.removeItem(key);
    }
}
