import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from './api.service';
import { AppService } from './app.service';
import { TokenService } from './token.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        public API: ApiService,
        public router: Router,
        private _token: TokenService,
        private appService: AppService
    ) {}

    login(user: { password: any; userNameOrEmailAddress: any }) {
        let LoginRequestPayload = {
            captchaResponse: null,
            password: user.password,
            rememberClient: false,
            returnUrl: null,
            singleSignIn: false,
            userNameOrEmailAddress: user.userNameOrEmailAddress,
        };

        this.API.runPost('TokenAuth/Authenticate', LoginRequestPayload).subscribe(
            (result) => this.reDirector(result),
            (err) => console.log(err)
        );
    }

    reDirector(result: { result: { accessToken: string } }) {
        console.log(result);
        this._token.setToken(result.result.accessToken);
    }

    getLoginInfo() {
        this.appService.getCurrentLoginInformation().subscribe((value) => {
            localStorage.setItem('user_info', JSON.stringify(value));

            if (!this.getUID()) {
                localStorage.removeItem('Template/abpzerotemplate_local_storage/enc_auth_token');
                localStorage.removeItem('user_info');
                localStorage.removeItem('loginTime');
                this.router.navigate(['/account/login']);
            }

            return value;
        });
    }

    getUID() {
        return JSON.parse(localStorage.getItem('user_info')).result.user;
    }
}
