import { Component, Injector, OnInit } from '@angular/core';
import { ModalRef } from '@app/shared/common/modal/modal-ref';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'app-incoming-order',
    templateUrl: './incoming-order.component.html',
    styleUrls: ['./incoming-order.component.css'],
    providers: [ModalRef],
})
export class IncomingOrderComponent extends AppComponentBase implements OnInit {
    constructor(injector: Injector, public modal: ModalRef) {
        super(injector);
        modal.component = IncomingOrderComponent;
    }

    ngOnInit() {}

    close() {
        this.modal.closeModal();
    }
}
