import { Component, Injector, OnInit } from '@angular/core';
import { ModalRef } from '@app/shared/common/modal/modal-ref';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'app-assign-task',
    templateUrl: './assign-task.component.html',
    styleUrls: ['./assign-task.component.css'],
    providers: [ModalRef],
})
export class AssignTaskComponent extends AppComponentBase implements OnInit {
    constructor(injector: Injector, public modal: ModalRef) {
        super(injector);
        modal.component = AssignTaskComponent;
    }

    ngOnInit() {}

    close() {
        this.modal.closeModal();
    }
}
