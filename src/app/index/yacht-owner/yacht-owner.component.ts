import { Component, Injector, OnInit } from '@angular/core';
import { YachtOwnerService } from '@app/index/yacht-owner/yacht-owner.service';
import { AuthService } from '@app/services/auth.service';
import { AppAuthService } from '@app/shared/common/auth/app-auth.service';

@Component({
    selector: 'app-yacht-owner',
    templateUrl: './yacht-owner.component.html',
    styleUrls: ['./yacht-owner.component.css'],
})
export class YachtOwnerComponent implements OnInit {
    constructor(
        public service: YachtOwnerService,
        private _authService: AppAuthService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.authService.getLoginInfo();
    }

    logout(): void {
        this._authService.logout();
    }
}
