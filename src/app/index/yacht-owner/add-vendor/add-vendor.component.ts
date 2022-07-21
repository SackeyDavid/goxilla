import { Component, OnInit } from '@angular/core';
import {ModalRef} from "@app/shared/common/modal/modal-ref";

@Component({
    selector: 'app-add-vendor',
    templateUrl: './add-vendor.component.html',
    styleUrls: ['./add-vendor.component.css'],
    providers: [ModalRef],
})
export class AddVendorComponent implements OnInit {
    constructor(public modal: ModalRef) {
        modal.component = AddVendorComponent;
    }

    ngOnInit() {}

    close() {
        this.modal.closeModal();
    }
}
