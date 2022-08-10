import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@app/shared/base.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DeleteServiceRequestService {
    constructor(private httpClient: HttpClient, private baseService: BaseService) {}

    deleteServiceRequest(id: any): Observable<any> {
        return this.httpClient.delete(`${this.baseService.baseUrl}/api/services/app/ServiceOrders/Delete?Id=` + id);
    }
}
