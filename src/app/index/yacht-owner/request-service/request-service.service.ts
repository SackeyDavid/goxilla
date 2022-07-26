import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@app/shared/base.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RequestServiceService {
    constructor(private baseService: BaseService, private httpClient: HttpClient) {}

    addEditServiceOrders(lead: any): Observable<any> {
        return this.httpClient.post(`${this.baseService.baseUrl}/api/services/app/Leads/CreateOrEdit`, lead);
    }
}
