import { Component, Injector, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { LoginService } from '@account/login/login.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SearchItem } from "@app/shared/common/search-box/search-item";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [LoginService]
})
export class LoginComponent extends AppComponentBase implements OnInit {

    env: any = environment;
    submitting: boolean = true;
    saving: boolean = false;

    constructor(public auth: LoginService, injector: Injector, public loginService: LoginService) {
        super(injector);
    }

    ngOnInit(): void {
    }

    login(): void {

        this.saving = true;

        this.loginService.authenticate(() => {
            this.submitting = true;
            this.saving = false;
            this.hideMainSpinner();
        },
            '/app/dashboard',
            null
        );

    }

    list: Array<SearchItem> = [
        {
            id: 1,
            value: 'Sam'
        },
        {
            id: 2,
            value: 'John'
        },
        {
            id: 3,
            value: 'Ray'
        }
    ];

    getSelectedItem(item: SearchItem) {
        console.log('selected', item)
    }

    addNew(item: string) {
        console.log('new item', item);
    }

}
