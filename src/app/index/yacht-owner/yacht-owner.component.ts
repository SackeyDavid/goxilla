import { Component, Injector, OnInit } from '@angular/core';
import { YachtOwnerService } from '@app/index/yacht-owner/yacht-owner.service';
import { AuthService } from '@app/services/auth.service';
import { AppAuthService } from '@app/shared/common/auth/app-auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppConsts } from '../../../shared/AppConsts';
import { AppService } from '../../services/app.service';
import { Router } from '@angular/router';
import { SelectServiceService } from './select-service/select-service.service';
import { MoreMenuComponent } from './more-menu/more-menu.component';
import { ModalService } from '@app/shared/common/modal/modal.service';

const helper = new JwtHelperService();

@Component({
    selector: 'app-yacht-owner',
    templateUrl: './yacht-owner.component.html',
    styleUrls: ['./yacht-owner.component.css'],
})
export class YachtOwnerComponent implements OnInit {
    storedToken: any;
    authTokenLocalizationName: string;
    encrptedAuthTokenName: string;
    appStoreName: string;
    storedTokenName: string;

    count: number = 0;

    constructor(
        public service: YachtOwnerService,
        private _authService: AppAuthService,
        private authService: AuthService,
        public AppService: AppService,
        public router: Router,
        private selectService: SelectServiceService,
        private modalService: ModalService
    ) { }

    ngOnInit(): void {
        this.authService.getLoginInfo();
        this.runTokenCheck();
        this.checkTokenExpiration();
        this.getAllServiceOrders();
    }

    runTokenCheck(): void {
        this.authTokenLocalizationName = AppConsts.localization.defaultLocalizationSourceName;
        this.encrptedAuthTokenName = AppConsts.authorization.encrptedAuthTokenName;
        this.appStoreName = 'abpzerotemplate_local_storage';

        this.storedTokenName =
            this.authTokenLocalizationName + '/' + this.appStoreName + '/' + this.encrptedAuthTokenName;
        this.storedToken = this.AppService.getStorageItem(this.storedTokenName);

        if (!this.storedToken) this.router.navigate(['/account/login']);
    }

    checkTokenExpiration() {
        const loginTime = this.AppService.getStorageItem('loginTime');
        const expirationTime = loginTime + 60 * 60 * 1000;

        if (new Date().getTime() >= expirationTime) {
            this.logout();
        }
    }

    logout(): void {
        this._authService.logout();
    }

    getAllServiceOrders() {
        this.selectService.getAllServiceOrders().subscribe((value) => {
            this.count = value.result.totalCount;
        });
    }

    openMoreMenuModal() {
        this.modalService.createModal<MoreMenuComponent>({
            content: MoreMenuComponent,
        });
    }

    get getUser(): any {
        // return sessionStorage.getItem('userId');
        return this.AppService.getStorageItem('user_info').result.user;
    }
}
