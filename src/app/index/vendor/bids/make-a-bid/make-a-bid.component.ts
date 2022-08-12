import { Component, Injector, OnInit } from '@angular/core';
import { ModalRef } from '@app/shared/common/modal/modal-ref';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'app-make-a-bid',
    templateUrl: './make-a-bid.component.html',
    styleUrls: ['./make-a-bid.component.css'],
    providers: [ModalRef],
})
export class MakeABidComponent extends AppComponentBase implements OnInit {
    constructor(injector: Injector, public modal: ModalRef) {
        super(injector);
        modal.component = MakeABidComponent;
    }

    ngOnInit() {}

    close() {
        this.modal.closeModal();
    }
}
