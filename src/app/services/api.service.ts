import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BASE_URL } from '../constants/api-constants';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(
        private http: HttpClient, @Inject(BASE_URL) private baseUrl: string, public router: Router,
    ) { }


    get<T>(url: string, params?: Map<string, any>): Observable<T> {

        params = params ? params : new Map<string, any>();
        let _params = this.buildParams(params);
        let _url = this.getUrl(url);
        return this.http.get(_url, { params: _params }).pipe(map((res: any) => {
            return res.result;
        }));

    }

    runGet(url: string, paramsData: readonly [string, any]): Observable<any> {

        let params = new Map<string, any>([paramsData]);
        return this.get(url, params);

    }

    post<T>(url: string, data?: T): Observable<T> {

        let _url = this.getUrl(url);
        //let payload = data ? JSON.stringify(data) : undefined;
        let payload = data;
        return this.http.post<T>(_url, payload);

    }

    runPost(url: string, data: any): Observable<any> {

        return this.post(url, data).pipe(map((result: any) => {
            return result;
        }));

    }

    runBinaryPost(url: string, data: any): Observable<any> {

        return this.BinaryPost(url, data).pipe(map((result: any) => {
            return result;
        }));

    }

    BinaryPost<T>(url: string, data?: T): Observable<T> {

        let repUrl = this.getUrl(url);

        let _url = repUrl.split('/api').join('');
        /* let payload = data ? JSON.stringify(data) : undefined; */
        let payload = data;
        return this.http.post<T>('https://staging-api.theyachtwatch.com' + url, payload);

    }

    put<T>(url: string, data: T): Observable<T> {

        let _url = this.getUrl(url);
        let payload = JSON.stringify(data);
        return this.http.put<T>(_url, payload);

    }

    delete<T>(url: string, params: Map<string, string>): Observable<any> {

        let _params = this.buildParams(params);
        let _url = this.getUrl(url);
        return this.http.delete<T>(_url, { params: _params });

    }

    private buildParams(params: Map<string, string>) {

        let _params = new HttpParams();
        for (let entry of params.entries()) {
            const key = entry[0];
            const value = entry[1];
            _params = _params.append(key, value);
        }

        return _params;

    }

    private getUrl(url: string) {
        return `${this.baseUrl}/${url}`;
    }

    getRoute(position: any = null) {

        if (position == null) {
            return (this.router.url.split('/')); // array of states
        } else {
            var routes = this.router.url.split('/')
            return (routes[position]);
        }

    }

    ProcessApiResponse(response: { result: any; }, next: any) {

        if (response.result) {
            next();
        } else {
            alert('Error');
        }

    }

}
