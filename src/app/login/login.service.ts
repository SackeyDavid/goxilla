import { Router } from '@angular/router';
import { BaseService } from '@app/shared/referral-base/base.service';
import { Injectable } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(private baseService: BaseService, private httpClient: HttpClient) {
    }

    login(user: any): any {
        return this.httpClient.post(`${this.baseService.baseUrl}/api/TokenAuth/Authenticate`, user);
    }
}
