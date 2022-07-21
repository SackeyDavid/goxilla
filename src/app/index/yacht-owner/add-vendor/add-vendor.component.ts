import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalRef } from '@app/shared/common/modal/modal-ref';

@Component({
    selector: 'app-add-vendor',
    templateUrl: './add-vendor.component.html',
    styleUrls: ['./add-vendor.component.css'],
    providers: [ModalRef],
})
export class AddVendorComponent implements OnInit {
    form!: FormGroup;

    constructor(public modal: ModalRef, private fb: FormBuilder) {
        modal.component = AddVendorComponent;
    }

    ngOnInit() {
        this.form = this.fb.group({
            id: [null],
            name: [null, Validators.required],
            contact: [null, Validators.required],
            phoneNumber: [null, Validators.required],
            emailAddress: [null, Validators.required],
        });
    }

    close() {
        this.modal.closeModal();
    }
}
