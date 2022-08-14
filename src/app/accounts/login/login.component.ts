import { Component, Injector, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { LoginService } from '@account/login/login.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { AppConsts } from '../../../shared/AppConsts';
import { AppService } from '../../services/app.service';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [LoginService],
})
export class LoginComponent extends AppComponentBase implements OnInit {

    env: any = environment;

    storedToken: any;
    authTokenLocalizationName: string;
    encrptedAuthTokenName: string;
    appStoreName: string;
    storedTokenName: string;

    userDataObject: any;
    userRole: string;

    constructor(
        injector: Injector,
        public loginService: LoginService,
        public AppService: AppService,
        public router: Router,
        private authService: AuthService
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.runTokenCheck();
    }

    login(): void {
        this.showMainSpinner();

        this.loginService.authenticate(
            () => {
                this.hideMainSpinner();
            },
            '/app/dashboard',
            null
        );

        this.AppService.setStorageItem('loginTime', new Date().getTime());
    }

    runTokenCheck(): void {
        this.authTokenLocalizationName = AppConsts.localization.defaultLocalizationSourceName;
        this.encrptedAuthTokenName = AppConsts.authorization.encrptedAuthTokenName;
        this.appStoreName = 'abpzerotemplate_local_storage';

        this.storedTokenName = this.authTokenLocalizationName + '/' + this.appStoreName + '/' + this.encrptedAuthTokenName;
        this.storedToken = this.AppService.getStorageItem(this.storedTokenName);

        this.userDataObject = this.AppService.getStorageItem('user_info');
        this.userRole = this.userDataObject.result.user.role.toLowerCase();

        if (this.storedToken !== null && this.userRole !== 'vendor')
            this.router.navigate(['/app/dashboard']);
        else
            this.router.navigate(['/app/vendor/dashboard']);
    }
}
