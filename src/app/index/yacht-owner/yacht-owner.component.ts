import { Component, Injector, OnInit } from '@angular/core';
import { YachtOwnerService } from '@app/index/yacht-owner/yacht-owner.service';
import { AuthService } from '@app/services/auth.service';
import { AppAuthService } from '@app/shared/common/auth/app-auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppConsts } from '../../../shared/AppConsts';
import { AppService } from '../../services/app.service';
import { Router } from '@angular/router';

const helper = new JwtHelperService();

@Component({
    selector: 'app-yacht-owner',
    templateUrl: './yacht-owner.component.html',
    styleUrls: ['./yacht-owner.component.css'],
})
export class YachtOwnerComponent implements OnInit {
<<<<<<< HEAD
    constructor(
        public service: YachtOwnerService,
        private _authService: AppAuthService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.authService.getLoginInfo();
=======

    storedToken: any;
    authTokenLocalizationName: string;
    encrptedAuthTokenName: string;
    appStoreName: string;
    storedTokenName: string;

    constructor(
        public service: YachtOwnerService,
        private _authService: AppAuthService,
        public AppService: AppService,
        public router: Router
    ) { }

    ngOnInit(): void {
        this.runTokenCheck();
        this.checkTokenExpiration();
    }

    runTokenCheck(): void {

        this.authTokenLocalizationName = AppConsts.localization.defaultLocalizationSourceName;
        this.encrptedAuthTokenName = AppConsts.authorization.encrptedAuthTokenName;
        this.appStoreName = "abpzerotemplate_local_storage";

        this.storedTokenName = this.authTokenLocalizationName + "/" + this.appStoreName + "/" + this.encrptedAuthTokenName;
        this.storedToken = this.AppService.getStorageItem(this.storedTokenName);

        if (!this.storedToken)
            this.router.navigate(['/account/login']);

    }

    checkTokenExpiration() {

        const loginTime = this.AppService.getStorageItem('loginTime');
        const expirationTime = loginTime + (60 * 60 * 1000);

        console.log(loginTime)
        console.log(expirationTime)

        console.log(new Date(loginTime))
        console.log(new Date(expirationTime))

        if (new Date().getTime() >= expirationTime) {
            this.logout();
        }

>>>>>>> 1afed928d185c37eb8c2ca89cc3347b1d47ae4a9
    }

    logout(): void {
        this._authService.logout();
    }
}
