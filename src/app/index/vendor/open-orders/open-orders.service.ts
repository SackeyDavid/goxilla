import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@app/shared/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenOrdersService {

  constructor(private httpClient: HttpClient, private baseService: BaseService) { }

  getVendorOrders(): Observable<any> {
    return this.httpClient.get(`${this.baseService.baseUrl}/api/services/app/ServiceOrders/GetAll`);
  }

}
