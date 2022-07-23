import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@app/shared/base.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AddVendorService {
    constructor(private httpClient: HttpClient, private baseService: BaseService) {}

    addEditVendor(vendor: any): Observable<any> {
        return this.httpClient.post(`${this.baseService.baseUrl}/api/services/app/Vendors/CreateOrEdit`, vendor);
    }
}
