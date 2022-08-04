import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@app/shared/base.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AssignVendorService {

    constructor(private httpClient: HttpClient, private baseService: BaseService) { }

    assignVendor(vendor: any): Observable<any> {
        return this.httpClient.post(`${this.baseService.baseUrl}/api/services/app/ServiceOrders/AssignVendor`, vendor);
    }

}
