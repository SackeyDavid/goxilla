import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@app/shared/base.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SelectServiceService {
    constructor(private httpClient: HttpClient, private baseService: BaseService) {}

    getServices(): Observable<any> {
        return this.httpClient.get(`${this.baseService.baseUrl}/api/services/app/Services/GetAll`);
    }

    addEditService(service: any): Observable<any> {
        return this.httpClient.post(`${this.baseService.baseUrl}/api/services/app/Services/CreateOrEdit`, service);
    }
}
