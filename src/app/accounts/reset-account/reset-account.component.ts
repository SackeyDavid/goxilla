import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from '@shared/common/app-component-base';
import { AppUrlService } from '@shared/common/nav/app-url.service';
import { AccountServiceProxy, SendPasswordResetCodeInput } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-reset-account',
    templateUrl: './reset-account.component.html',
    styleUrls: ['./reset-account.component.css']
})
export class ResetAccountComponent extends AppComponentBase implements OnInit {

    saving: boolean = false;
    model: SendPasswordResetCodeInput = new SendPasswordResetCodeInput();

    constructor(
        injector: Injector,
        private _accountService: AccountServiceProxy,
        private _appUrlService: AppUrlService,
        private _router: Router
    ) {
        super(injector);
    }

    ngOnInit(): void {
    }

    resetPassword() {

        this.saving = true;

        this._accountService.sendPasswordResetCode(this.model).pipe(finalize(() => { this.saving = false; })).subscribe(() => {
            this.message.success(this.l('PasswordResetMailSentMessage'), this.l('MailSent')).then(() => {
                this._router.navigate(['account/login']);
            });
        });

    }

}
