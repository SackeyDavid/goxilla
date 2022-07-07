import { RegisterService } from './register.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseService } from '@app/shared/referral-base/base.service';
import { environment } from 'environments/environment';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    env: any = environment;
    loading = false;
    form!: FormGroup;
    today = new Date();
    constructor(private fb: FormBuilder,
        private baseService: BaseService,
        private service: RegisterService,
        private router: Router) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            name: [null, Validators.required],
            surname: [null, Validators.required],
            userName: [null, Validators.required],
            emailAddress: [null, Validators.required],
            password: [null, Validators.required]
        });
    }

    register(): void {
        this.baseService.clearSessionData();
        this.loading = true;
        this.service.register(this.form.value)
            .pipe(finalize(() => this.loading = false))
            .subscribe(
                (u: any) => {
                    if (u.success) {
                        this.router.navigate(['/login']);
                    }
                });
    }
}
