import { Component, Injector, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { LoginService } from '@account/login/login.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SearchItem } from '@app/shared/common/search-box/search-item';
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
    submitting: boolean = true;

    storedToken: any;
    authTokenLocalizationName: string;
    encrptedAuthTokenName: string;
    appStoreName: string;
    storedTokenName: string;

    constructor(
        public auth: LoginService,
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
                this.submitting = true;
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

        this.storedTokenName =
            this.authTokenLocalizationName + '/' + this.appStoreName + '/' + this.encrptedAuthTokenName;
        this.storedToken = this.AppService.getStorageItem(this.storedTokenName);

        if (this.storedToken !== null) this.router.navigate(['/app/dashboard']);
    }

    list: Array<SearchItem> = [
        {
            id: 1,
            value: 'Sam',
        },
        {
            id: 2,
            value: 'John',
        },
        {
            id: 3,
            value: 'Ray',
        },
    ];

    getSelectedItem(item: SearchItem) {
        console.log('selected', item);
    }

    addNew(item: string) {
        console.log('new item', item);
    }

    // getRedirectUrl() {
    //     if(this.userName == 'david@gmail.com' )

    // }
}
