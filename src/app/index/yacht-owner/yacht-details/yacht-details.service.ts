import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@app/shared/base.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class YachtDetailsService {
    constructor(private httpClient: HttpClient, private baseService: BaseService) {}

    getAllYachts(): Observable<any> {
        return this.httpClient.get(`${this.baseService.baseUrl}/api/services/app/Yachts/GetAll?MaxResultCount=30`);
    }

    getYachtDetails(id: number): Observable<any> {
        return this.httpClient.get(`${this.baseService.baseUrl}/api/services/app/Yachts/GetYatchForView?id=` + id);
    }

    addEditYacht(yacht: any): Observable<any> {
        return this.httpClient.post(`${this.baseService.baseUrl}/api/Yacht/CreateYacht`, yacht, {
            headers: { 'content-type': 'multipart/form-data' },
        });
    }

    removeYacht(id: any): Observable<any> {
        return this.httpClient.delete(`${this.baseService.baseUrl}/api/services/app/Yachts/Delete?Id=` + id);
    }
}
