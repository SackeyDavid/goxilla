import { Injectable } from '@angular/core';

const ACCESS_TOKEN = 'access_token';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    constructor() { }

    setToken(token: string) {
        localStorage.setItem(ACCESS_TOKEN, token);
    }

    getToken() {
        return localStorage.getItem(ACCESS_TOKEN);
    }

    clear() {
        localStorage.removeItem(ACCESS_TOKEN);
    }

}
