import { Component, Injector, OnInit } from '@angular/core';
import { ModalRef } from '@app/shared/common/modal/modal-ref';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SearchItem } from '@app/shared/common/search-box/search-item';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OpenOrdersService } from '../../open-orders/open-orders.service';
import { AppService } from '@app/services/app.service';
import { ApiService } from '@app/services/api.service';

@Component({
    selector: 'app-assign-technician',
    templateUrl: './assign-technician.component.html',
    styleUrls: ['./assign-technician.component.css'],
    providers: [ModalRef],
})
export class AssignTechnicianComponent extends AppComponentBase implements OnInit {
    form!: FormGroup;
    preTechniciansList: any[] = [];
    technicians: any[] = [];
    serviceDataObject: any;

    constructor(
        injector: Injector,
        public modal: ModalRef,
        private vendorOrdersService: OpenOrdersService,
        private fb: FormBuilder,
        private AppService: AppService,
        private ApiService: ApiService
    ) {
        super(injector);
        modal.component = AssignTechnicianComponent;
    }

    ngOnInit() {
        this.form = this.fb.group({
            technicianId: [null, Validators.required],
            serviceOrderId: [null, Validators.required],
            scheduledDate: [null, Validators.required],
            scheduledTime: [null, Validators.required],
            specialInstructions: [null, Validators.required],
        });

        this.getTechnicians();
        if (this.AppService.getStorageItem('selectedOrder')) {
            this.serviceDataObject = this.AppService.getStorageItem('selectedOrder');
        }
    }

    getSelectedYacht(item: SearchItem) {
        this.setValue('technicianId', item.id);
    }

    getTechnicians() {
        this.showMainSpinner();

        this.vendorOrdersService.getAllTechnicians().subscribe((value) => {
            this.preTechniciansList = value.result.items;
            this.preTechniciansList.forEach((technicianObj) => {
                this.technicians.push({
                    id: technicianObj.technician.id,
                    value: technicianObj.technician.name,
                });
            });

            this.hideMainSpinner();
        });
    }

    setAssignPayload() {
        this.serviceDataObject = this.AppService.getStorageItem('selectedOrder');

        this.setValue('serviceOrderId', this.serviceDataObject.serviceOrder.id);
        this.setValue('scheduledDate', new Date(this.serviceDataObject.serviceOrder.creationTime).toISOString());
        this.setValue(
            'scheduledTime',
            new Date(this.serviceDataObject.serviceOrder.expectedDeliveryDate).toISOString()
        );
    }

    setValue(control: string, value: any) {
        this.form.controls[control].setValue(value);
    }

    assignTechnician() {
        this.showMainSpinner();
        this.setAssignPayload();

        this.vendorOrdersService.assignTechnician(this.form.value).subscribe(
            (response) => {
                if (response.success === true) {
                    this.notify.success('Technician assigned successfully');
                    this.close();
                    this.hideMainSpinner();
                }
            },
            (error) => {
                console.log(error);
                this.hideMainSpinner();
                this.notify.error(error);
            }
        );
    }

    close() {
        this.modal.closeModal();
        this.AppService.removeStorageItem('selectedOrder');
    }
}
