import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@app/shared/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditServiceRequestService {

  constructor(private httpClient: HttpClient, private baseService: BaseService) { }

  editServiceRequest(request: any): Observable<any> {
    return this.httpClient.post(`${this.baseService.baseUrl}/api/services/app/***`, request);
  }

}
