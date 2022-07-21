import { ComponentRef, EventEmitter, Injectable, OnInit, Output, Type } from '@angular/core';
import { ModalService } from './modal.service';

@Injectable()
export class ModalRef {
    componentInstance!: ComponentRef<any>;
    component!: Type<any>;
    @Output() modalClose = new EventEmitter<any>();
    ref!: ModalRef;
    constructor(private modal: ModalService) {}

    closeModal() {
        const compIndex = this.modal.modals.findIndex((u) => u.content === this.component);
        const mainModal = this.modal.modals.find((u) => u.content === this.component);
        this.componentInstance = mainModal!.componentRef;
        this.componentInstance?.destroy();
        this.modal.modals.splice(compIndex, 1);
        // console.log(this.modal.modals);
    }
}
