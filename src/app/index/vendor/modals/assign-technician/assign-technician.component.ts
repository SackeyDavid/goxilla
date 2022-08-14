import { Component, Injector, OnInit } from '@angular/core';
import { ModalRef } from '@app/shared/common/modal/modal-ref';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'app-assign-technician',
    templateUrl: './assign-technician.component.html',
    styleUrls: ['./assign-technician.component.css'],
    providers: [ModalRef],
})
export class AssignTechnicianComponent extends AppComponentBase implements OnInit {
    constructor(injector: Injector, public modal: ModalRef) {
        super(injector);
        modal.component = AssignTechnicianComponent;
    }

    ngOnInit() {}

    close() {
        this.modal.closeModal();
    }
}
