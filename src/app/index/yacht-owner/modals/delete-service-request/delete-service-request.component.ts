import { Component, Injector, OnInit } from '@angular/core';
import { AppService } from '@app/services/app.service';
import { ModalRef } from '@app/shared/common/modal/modal-ref';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DeleteServiceRequestService } from './delete-service-request.service';

@Component({
    selector: 'app-delete-service-request',
    templateUrl: './delete-service-request.component.html',
    styleUrls: ['./delete-service-request.component.css'],
    providers: [ModalRef],
})
export class DeleteServiceRequestComponent extends AppComponentBase implements OnInit {
    requestDetail: any;

    constructor(
        injector: Injector,
        public modal: ModalRef,
        private AppService: AppService,
        private service: DeleteServiceRequestService
    ) {
        super(injector);
        modal.component = DeleteServiceRequestComponent;
    }

    ngOnInit() {
        if (this.AppService.getStorageItem('requestDetails')) {
            this.requestDetail = this.AppService.getStorageItem('requestDetails');
        }
    }

    close() {
        this.modal.closeModal();
    }

    deleteServiceOrder() {
        this.showMainSpinner();

        console.log(this.requestDetail.serviceOrder.id);
        this.service.deleteServiceRequest(this.requestDetail.serviceOrder.id).subscribe(
            (result) => {
                if (result.success === true) {
                    this.notify.success(this.l('Service Order Deleted Successfully'));
                    window.location.reload();
                    this.hideMainSpinner();
                    this.close();
                    return;
                }
            },
            (e) => {
                this.hideMainSpinner();
                this.notify.error(this.l(e.error.error.message));
                return;
            }
        );
    }
}
