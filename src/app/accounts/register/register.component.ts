import { Component, Injector, OnInit } from '@angular/core';
import { RegisterModel } from '@account/register/register.model';
import { Router } from '@angular/router';
import { AppComponentBase } from '@shared/common/app-component-base';
import { AccountServiceProxy, RegisterOutput } from '@shared/service-proxies/service-proxies';
import { catchError } from 'rxjs/operators';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent extends AppComponentBase implements OnInit {

    model: RegisterModel = new RegisterModel();
    saving: boolean = false;

    constructor(injector: Injector, private _accountService: AccountServiceProxy, private _router: Router) {
        super(injector);
    }

    ngOnInit(): void {
    }

    onFormSubmit(): void {

        this.saving = true;
        this.model.userName = this.model.emailAddress;

        this._accountService.register(this.model).pipe(
            catchError((err, caught): any => {
                this.saving = false;
                console.log(err);
            })
        ).subscribe((result: RegisterOutput) => {

            this.saving = false;

            if (result.canLogin) {
                this.notify.success(this.l('SuccessfullyRegistered'));
                this._router.navigate(['account/login']);
                return;
            }

        },
            (e) => {
                this.saving = false;
                console.log(e, e.message)
            },

        );

    }

}
