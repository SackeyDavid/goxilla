import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseService } from '@app/shared/base.service';
import { ModalRef } from '@app/shared/common/modal/modal-ref';
import { finalize } from 'rxjs/operators';
import { AddVendorService } from './add-vendor.service';

@Component({
    selector: 'app-add-vendor',
    templateUrl: './add-vendor.component.html',
    styleUrls: ['./add-vendor.component.css'],
    providers: [ModalRef],
})
export class AddVendorComponent implements OnInit {
    form!: FormGroup;
    editState: boolean = false;

    constructor(
        public modal: ModalRef,
        private fb: FormBuilder,
        public service: AddVendorService,
        public baseService: BaseService
    ) {
        modal.component = AddVendorComponent;
    }

    ngOnInit() {
        this.form = this.fb.group({
            id: [0],
            firstName: [null, Validators.required],
            lastName: [null, Validators.required],
            isActive: true,
            phone: [null, Validators.required],
            emailAddress: [null, Validators.required],
            address: [null, Validators.required],
            descriptions: [null, Validators.required],
        });

        if (sessionStorage.getItem('vendor_new_item'))
            this.form.controls['firstName'].setValue(sessionStorage.getItem('vendor_new_item'));
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
            .addEditVendor(this.form.value)
            .pipe(finalize(() => console.log('vendor add/edit success')))
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
