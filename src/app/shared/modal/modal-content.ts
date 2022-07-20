import {ComponentRef, EventEmitter, Type} from "@angular/core";
import {Subject} from "rxjs";
import {ModalRef} from "./modal-ref";

export interface ModalContent<T> {
    content: Type<T>;
    componentRef: ComponentRef<T>;
    modalRef?: ModalRef
}
