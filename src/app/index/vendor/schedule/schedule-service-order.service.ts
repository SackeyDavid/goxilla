import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@app/shared/base.service';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ScheduleServiceOrderService {
    constructor(private http: HttpClient, private baseService: BaseService) {}

    getAllServiceSchedules(): Observable<any[]> {
        return this.http.get<any>(`${this.baseService.baseUrl}/api/services/app/ServiceOrderSchedules/GetAll`).pipe(
            map((data) => {
                console.log('all service schedules');
                console.log(data.result);
                return data.result;
            })
        );
    }

    getServiceOrderSchedulesForView(): Observable<any[]> {
        return this.http
            .get(`${this.baseService.baseUrl}/api/services/app/ServiceOrderSchedules/GetServiceOrderScheduleForView`)
            .pipe(
                map((data: any) => {
                    console.log('all service order schedules for view');
                    console.log(data.result);
                    return data.result;
                })
            );
    }

    getServiceOrderSchedulesForEdit(): Observable<any[]> {
        return this.http
            .get(`${this.baseService.baseUrl}/api/services/app/ServiceOrderSchedules/GetServiceOrderScheduleForEdit`)
            .pipe(
                map((data: any) => {
                    console.log('get service order schedules for edit');
                    console.log(data.result);
                    return data.result;
                })
            );
    }

    getAllTechnicianForLookUpTable(): Observable<any[]> {
        // return this.http.get(this.baseUrl+"/api/services/app/ServiceOrderSchedules/GetAllTechnicianForLookUpTable?MaxResultCount="+100).pipe(map((data:any) => {
        //     console.log('all technicians');
        //     console.log(data.result);
        //     return data.result;
        // }));

        var techJson: any = {
            totalCount: 5,
            items: [
                {
                    id: 1,
                    displayName: 'Richard Adu',
                },
                {
                    id: 2,
                    displayName: 'David Sackey',
                },
                {
                    id: 3,
                    displayName: 'Hermann Mornah',
                },
                {
                    id: 4,
                    displayName: 'Konlan Mikpekoah',
                },
                {
                    id: 5,
                    displayName: 'Benard Ossei-Agyei',
                },
            ],
        };

        return techJson;
    }

    getAllServiceOrderSchedulesForLookupTable(): Observable<any[]> {
        return this.http
            .get<any>(
                `${this.baseService.baseUrl}/api/services/app/ServiceOrderSchedules/GetAllServiceOrderForLookupTable?MaxResultCount=` +
                    100
            )
            .pipe(
                map((data) => {
                    console.log('all service order schedules for ');
                    console.log(data.result);
                    return data.result;
                })
            );
    }

    getAllTechnicians(): Observable<any[]> {
        return this.http.get(`${this.baseService.baseUrl}/api/services/app/Technicians/GetAll`).pipe(
            map((data: any) => {
                console.log('all technicians');
                console.log(data.result);
                return data.result;
            })
        );
    }
}
