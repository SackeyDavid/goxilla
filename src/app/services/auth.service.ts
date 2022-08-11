import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from './api.service';
import { AppService } from './app.service';
import { TokenService } from './token.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    userDataObject: any;

    constructor(
        public API: ApiService,
        public router: Router,
        private _token: TokenService,
        private appService: AppService
    ) { }

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

            this.appService.setStorageItem('user_info', value);

            if (!this.getUID()) {
                this.appService.clearStorage();
                this.router.navigate(['/account/login']);
            }

        });

        this.userDataObject = this.appService.getStorageItem('user_info');

        return this.userDataObject;

    }

    getUID() {
        return this.appService.getStorageItem('user_info').result.user;
    }
}
