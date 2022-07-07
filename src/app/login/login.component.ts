import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseService } from '@app/shared/referral-base/base.service';
import { finalize } from 'rxjs/operators';
import { environment } from 'environments/environment';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    env: any = environment;
    loading = false;
    today = new Date();
    form!: FormGroup;
    constructor(private fb: FormBuilder,
        private baseService: BaseService,
        private router: Router,
        private service: LoginService) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            userNameOrEmailAddress: [null, Validators.required],
            password: [null, Validators.required]
        });
    }

    login(): void {
        this.baseService.clearSessionData();
        this.loading = true;
        this.service.login(this.form.value)
            .pipe(finalize(() => this.loading = false))
            .subscribe(
                (u: any) => {
                    if (u.success) {
                        this.setUserData(u.result);
                        this.router.navigate(['/referral/dashboard']);
                    }
                });
    }

    setUserData(result: any): void {
        this.baseService.setSessionData(result);
    }

}
