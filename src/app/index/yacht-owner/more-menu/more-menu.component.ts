import { Component, OnInit } from '@angular/core';
import { ModalRef } from '@app/shared/common/modal/modal-ref';
import { MoreMenuService } from './more-menu.service';

@Component({
    selector: 'app-more-menu',
    templateUrl: './more-menu.component.html',
    styleUrls: ['./more-menu.component.css'],
    providers: [ModalRef],
})
export class MoreMenuComponent implements OnInit {
    constructor(public modal: ModalRef, public service: MoreMenuService) {
        modal.component = MoreMenuComponent;
    }

    ngOnInit() {}

    close() {
        this.modal.closeModal();
    }
}
