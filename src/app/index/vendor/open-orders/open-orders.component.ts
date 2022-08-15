import { Component, Injector, OnInit } from '@angular/core';
import { AppService } from '@app/services/app.service';
import { ModalService } from '@app/shared/common/modal/modal.service';
import { AssignTaskComponent } from '../modals/assign-task/assign-task.component';
import { AssignTechnicianComponent } from '../modals/assign-technician/assign-technician.component';
import { IncomingOrderComponent } from '../modals/incoming-order/incoming-order.component';
import { OpenOrdersService } from './open-orders.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';

@Component({
    selector: 'app-open-orders',
    templateUrl: './open-orders.component.html',
    styleUrls: ['./open-orders.component.css'],
})
export class OpenOrdersComponent extends AppComponentBase implements OnInit {
    selectedIndex: number = 0;
    orderDetail: any;
    vendorOrders: any;
    acceptedOrders: any[] = [];

    constructor(
        injector: Injector,
        private modalService: ModalService,
        private vendorOrdersService: OpenOrdersService,
        private AppService: AppService
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.getVendorOrders();
        if (this.AppService.getStorageItem('acceptedOrders'))
            this.acceptedOrders = this.AppService.getStorageItem('acceptedOrders');
    }

    openAssignTaskModal() {
        this.modalService.createModal<AssignTaskComponent>({
            content: AssignTaskComponent,
        });
    }

    openAssignTechnicianModal() {
        this.AppService.setStorageItem('selectedOrder', this.orderDetail);
        this.modalService.createModal<AssignTechnicianComponent>({
            content: AssignTechnicianComponent,
        });
    }

    acceptOrder(id: number) {
        let index = this.vendorOrders.map((object) => object.serviceOrder.id).indexOf(id);
        this.acceptedOrders.push(this.vendorOrders[index]);
        this.AppService.setStorageItem('acceptedOrders', this.acceptedOrders);

        this.acceptedOrders = this.AppService.getStorageItem('acceptedOrders');
    }

    openAcceptIncomingOrderModal(index: number) {
        this.selectedIndex = index;
        this.orderDetail = this.vendorOrders[index];
        /* this.modalService.createModal<IncomingOrderComponent>({
            content: IncomingOrderComponent,
        }); */
    }

    getVendorOrders() {
        this.showMainSpinner();

        this.vendorOrdersService.getVendorOrders().subscribe((value) => {
            this.vendorOrders = value.result.items;
            this.orderDetail = this.vendorOrders[this.selectedIndex];
            this.hideMainSpinner();
        });
    }

    getDateFormatted(date: any) {
        if (date) return moment(date).format('MM/DD/YYYY');
        return '';
    }

    thisOrderAccepted(id: number) {
        if (this.acceptedOrders?.length) {
            let index_of_orderItem = this.acceptedOrders.map((object) => object.serviceOrder.id).indexOf(id);

            if (index_of_orderItem !== -1) return true;
            return false;
        }
        return false;
    }

    getSelectedOrder(order: any) {
        this.AppService.setStorageItem('selectedOrder', order);
    }

    openOrdersAssignTechnician(order: any) {
        this.orderDetail = order;

        // this.openAssignTechnicianModal();
    }
}
