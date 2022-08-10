import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseService } from '@app/shared/base.service';
import { ModalRef } from '@app/shared/common/modal/modal-ref';
import { AppComponentBase } from '@shared/common/app-component-base';
import { finalize } from 'rxjs/operators';
import { SelectServiceService } from '../select-service/select-service.service';

@Component({
    selector: 'app-add-service',
    templateUrl: './add-service.component.html',
    styleUrls: ['./add-service.component.css'],
    providers: [ModalRef],
})
export class AddServiceComponent extends AppComponentBase implements OnInit {
    form!: FormGroup;
    editState: boolean = false;
    submitted: boolean = false;

    constructor(
        injector: Injector,
        public modal: ModalRef,
        private fb: FormBuilder,
        public service: SelectServiceService,
        public baseService: BaseService
    ) {
        super(injector);
        modal.component = AddServiceComponent;
    }

    ngOnInit() {
        this.form = this.fb.group({
            name: [null, Validators.required],
            cost: [null, Validators.required],
        });

        if (sessionStorage.getItem('service_new_item')) {
            this.form.controls['name'].setValue(sessionStorage.getItem('service_new_item'));
        }
        if (sessionStorage.getItem('service_edit_item')) {
            this.editItem(JSON.parse(sessionStorage.getItem('service_edit_item')));
        }
    }

    close() {
        this.modal.closeModal();
    }

    get f(): any {
        return this.form.controls;
    }

    reset() {
        this.form.reset();
        this.editState = false;
    }

    addEditVendor() {
        this.submitted = true;

        if (this.form.invalid) {
            console.log(this.findInvalidControls());
            return;
        }

        this.service
            .addEditService(this.form.value)
            .pipe(finalize(() => console.log('service add/edit success')))
            .subscribe(
                (result) => {
                    if (result.success === true) {
                        this.notify.success(this.l('Service ' + this.editState ? 'Edited' : 'Added' + ' Successfully'));
                        this.reset();
                        this.close();
                        window.location.reload();
                        return;
                    }
                },
                (error) => {
                    this.notify.error(this.l(error.error.error.message));
                    console.log(error);
                }
            );
    }

    editItem(service: any) {
        console.log(service);
        this.form.patchValue({
            id: service.id,
            name: service.name,
            isActive: service.isActive,
            cost: service.cost,
        });

        this.editState = true;
        sessionStorage.removeItem('service_edit_item');
    }

    public findInvalidControls() {
        const invalid = [];
        const controls = this.form.controls;
        for (const name in controls) {
            if (controls[name].invalid) {
                invalid.push(name);
            }
        }
        return invalid;
    }
}
