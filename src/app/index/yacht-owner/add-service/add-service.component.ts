import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseService } from '@app/shared/base.service';
import { ModalRef } from '@app/shared/common/modal/modal-ref';
import { finalize } from 'rxjs/operators';
import { SelectServiceService } from '../select-service/select-service.service';

@Component({
    selector: 'app-add-service',
    templateUrl: './add-service.component.html',
    styleUrls: ['./add-service.component.css'],
    providers: [ModalRef],
})
export class AddServiceComponent implements OnInit {
    form!: FormGroup;
    editState: boolean = false;

    constructor(
        public modal: ModalRef,
        private fb: FormBuilder,
        public service: SelectServiceService,
        public baseService: BaseService
    ) {
        modal.component = AddServiceComponent;
    }

    ngOnInit() {
        this.form = this.fb.group({
            id: [0],
            name: [null, Validators.required],
            isActive: true,
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
                (value) => {
                    this.reset();
                    console.log(value);
                    this.close();
                },
                (error) => {
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
