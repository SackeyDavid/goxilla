import { Component, OnInit } from '@angular/core';
import { ModalRef } from '@app/shared/modal/modal-ref';
import { ModalService } from '@app/shared/modal/modal.service';

@Component({
    selector: 'app-add-vendor',
    templateUrl: './add-vendor.component.html',
    styleUrls: ['./add-vendor.component.css'],
    providers: [ModalRef],
})
export class AddVendorComponent implements OnInit {
    constructor(private modalService: ModalService, public modal: ModalRef) {
        modal.component = AddVendorComponent;
    }

    ngOnInit() {}

    close() {
        this.modal.closeModal();
    }
}
