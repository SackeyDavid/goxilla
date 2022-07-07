import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@app/shared/referral-base/base.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
    constructor(private baseService: BaseService, private httpClient: HttpClient) {
    }

    register(user: any): any {
        return this.httpClient.post(`${this.baseService.baseUrl}/api/services/app/Account/Register`, user);
    }
}
