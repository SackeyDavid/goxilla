import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { ApiService } from './api.service';
import { TokenService } from "./token.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(public API: ApiService, public router: Router, private _token: TokenService) { }

    login(user: { password: any; userNameOrEmailAddress: any; }) {

        let LoginRequestPayload = {
            "captchaResponse": null,
            "password": user.password,
            "rememberClient": false,
            "returnUrl": null,
            "singleSignIn": false,
            "userNameOrEmailAddress": user.userNameOrEmailAddress
        }

        this.API.runPost("TokenAuth/Authenticate", LoginRequestPayload).subscribe(result => this.reDirector(result), err => console.log(err));

    }

    /*  public isAuthenticated(): boolean {
 
         const token = this._token.getToken();
        
         return !this.jwtHelper.isTokenExpired(token);
 
     } */

    reDirector(result: { result: { accessToken: string; }; }) {
        console.log(result);
        this._token.setToken(result.result.accessToken);
    }

}
