import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@app/shared/base.service';
import { Observable, throwError, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServiceOrder } from './schedule';

@Injectable({
    providedIn: 'root',
})
export class ScheduleService {
    constructor(private http: HttpClient, private baseService: BaseService) {}

    getAll(): Observable<any[]> {
        return this.http.get(`${this.baseService.baseUrl}/api/services/app/ServiceOrderSchedules/GetAll`).pipe(
            map((data: any) => {
                console.log('all service order ');
                console.log(data.result);
                return data.result;
            })
        );
    }

    getServiceOrderForView(): Observable<any[]> {
        return this.http
            .get(`${this.baseService.baseUrl}/api/services/app/ServiceOrderSchedules/GetServiceOrderForView`)
            .pipe(
                map((data: any) => {
                    console.log('get service order ');
                    console.log(data.result);
                    return data.result;
                })
            );
    }

    getServiceOrderForEdit(id: any): Observable<any[]> {
        return this.http
            .get(`${this.baseService.baseUrl}/api/services/app/ServiceOrderSchedules/GetServiceOrderForEdit?id=` + id)
            .pipe(
                map((data: any) => {
                    console.log('all service order ');
                    console.log(data.result);
                    return data.result;
                })
            );
    }

    getServiceOrderById(id: any): Observable<any[]> {
        return this.http
            .get(`${this.baseService.baseUrl}/api/services/app/ServiceOrderSchedules/GetById?id=` + id)
            .pipe(
                map((data: any) => {
                    console.log('all service order by id => ' + `${id}`);
                    console.log(data.result);
                    return data.result;
                })
            );
    }

    _createServiceRequest(order: any): Observable<any> {
        return this.http
            .post(`${this.baseService.baseUrl}/api/ServiceRequest/CreateServiceRequest`, JSON.stringify(order))
            .pipe(
                map((data: any) => {
                    console.log('create service request => ' + `${order.json()}`);
                    console.log(data.result);
                    return data.result;
                })
            );
    }

    createServiceRequest(topic: ServiceOrder) {
        return this.http
            .post(`${this.baseService.baseUrl}/api/ServiceRequest/CreateServiceRequest`, {
                body: JSON.stringify(topic),
            })
            .pipe((response) => response)
            .subscribe((data) => {});
    }

    createOrEditATechkie(model: any) {
        //  let headers = new HttpHeaders ();
        //  headers.append('Accept', 'application/json');
        //  headers.append('Content-Type', 'application/json');
        //  headers.append('Access-Control-Allow-Origin', '*');

        return this.http
            .post(`${this.baseService.baseUrl}/api/services/app/ServiceOrderSchedules/CreateOrEdit`, { body: model })
            .pipe((response) => response)
            .subscribe((data) => {
                console.log('createOrEditATechkie', data);
                return data;
            });
    }
}
