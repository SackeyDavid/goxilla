import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseService } from '@app/shared/base.service';
import { ModalRef } from '@app/shared/common/modal/modal-ref';
import { AppComponentBase } from '@shared/common/app-component-base';
import { finalize } from 'rxjs/operators';
import { AddVendorService } from './add-vendor.service';

@Component({
    selector: 'app-add-vendor',
    templateUrl: './add-vendor.component.html',
    styleUrls: ['./add-vendor.component.css'],
    providers: [ModalRef],
})
export class AddVendorComponent extends AppComponentBase implements OnInit {
    form!: FormGroup;
    editState: boolean = false;
    submitted: boolean = false;

    constructor(
        injector: Injector,
        public modal: ModalRef,
        private fb: FormBuilder,
        public service: AddVendorService,
        public baseService: BaseService
    ) {
        super(injector);
        modal.component = AddVendorComponent;
    }

    ngOnInit() {
        this.form = this.fb.group({
            firstName: [null, Validators.required],
            lastName: [null, Validators.required],
            phone: ['', [Validators.required, Validators.minLength(10)]],
            emailAddress: [
                '',
                [
                    Validators.required,
                    Validators.email,
                    Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
                ],
            ],
            address: [null, Validators.required],
            descriptions: [null, Validators.required],
        });

        if (sessionStorage.getItem('vendor_new_item'))
            this.form.controls['firstName'].setValue(sessionStorage.getItem('vendor_new_item'));
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
            return;
        }

        this.service
            .addEditVendor(this.form.value)
            .pipe(finalize(() => console.log('vendor add/edit success')))
            .subscribe(
                (result) => {
                    if (result.success === true) {
                        this.notify.success(this.l('Vendor Created Successfully'));
                        this.reset();
                        window.location.reload();
                        this.close();
                        return;
                    }
                },
                (error) => {
                    this.notify.error(this.l(error.error.error.message));
                    // console.log(error);
                }
            );
    }

    editItem(vendor: any) {
        this.form.patchValue({
            id: vendor.id,
            firstName: vendor.firstName,
            lastName: vendor.lastName,
            isActive: true,
            phone: vendor.phone,
            emailAddress: vendor.emailAddress,
            address: vendor.address,
            descriptions: vendor.descriptions,
        });

        this.editState = true;
    }
}
