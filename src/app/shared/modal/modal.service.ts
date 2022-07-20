import {ComponentRef, Injectable, Type, ViewContainerRef} from '@angular/core';
import {Modal} from "./modal";
import {ModalContent} from "./modal-content";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  mainComponent!: ViewContainerRef;
  modals: Array<ModalContent<any>> = [];
  constructor() { }

  createModal<T>(modal: Modal<T>): ModalContent<T> {
    const mod = this.mainComponent.createComponent(modal.content);
    const result: ModalContent<T> = {
      content: modal.content,
      componentRef: mod
    }

    this.modals.push(result);
    return result;
  }
}
