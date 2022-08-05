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

        if (sessionStorage.getItem('service_new_item'))
            this.form.controls['name'].setValue(sessionStorage.getItem('service_new_item'));
    }

    close() {
        this.modal.closeModal();
    }

    reset() {
        this.form.reset();
        this.editState = false;
    }

    addEditVendor() {
        this.service
            .addEditService(this.form.value)
            .pipe(finalize(() => console.log('services add/edit success')))
            .subscribe(
                (result) => {
                    if (result.success === true) {
                        this.notify.success(this.l('Service Created Successfully'));
                        this.reset();
                        this.close();
                    }
                },
                (error) => {
                    this.notify.error(this.l(error.error.error.message));
                    console.log(error);
                }
            );
    }

    editItem(service: any) {
        this.form.patchValue({
            id: service.id,
            name: service.name,
            isActive: service.isActive,
            cost: service.phone,
        });

        this.editState = true;
    }
}
