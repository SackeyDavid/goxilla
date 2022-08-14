import { Component, OnInit } from '@angular/core';
import { AppService } from '@app/services/app.service';
import { ModalService } from '@app/shared/common/modal/modal.service';
import { AssignTaskComponent } from '../modals/assign-task/assign-task.component';
import { AssignTechnicianComponent } from '../modals/assign-technician/assign-technician.component';
import { IncomingOrderComponent } from '../modals/incoming-order/incoming-order.component';
import { OpenOrdersService } from './open-orders.service';
import * as moment from 'moment';

@Component({
    selector: 'app-open-orders',
    templateUrl: './open-orders.component.html',
    styleUrls: ['./open-orders.component.css'],
})
export class OpenOrdersComponent implements OnInit {
    selectedIndex: number = 0;
    orderDetail: any;
    vendorOrders: any;
    acceptedOrders: any = [];

    constructor(
        private modalService: ModalService,
        private vendorOrdersService: OpenOrdersService,
        private appService: AppService
    ) {}

    ngOnInit(): void {
        this.getVendorOrders();
        this.acceptedOrders = this.appService.getStorageItem('acceptedOrders');
        console.log(this.acceptedOrders);
    }

    openAssignTaskModal() {
        this.modalService.createModal<AssignTaskComponent>({
            content: AssignTaskComponent,
        });
    }

    openAssignTechnicianModal() {
        this.modalService.createModal<AssignTechnicianComponent>({
            content: AssignTechnicianComponent,
        });
    }

    openAcceptIncomingOrderModal(index: number) {
        if (!this.thisOrderAccepted(index)) {
            this.acceptedOrders.push(this.vendorOrders[index]);
            // this.appService.setStorageItem('acceptedOrders', this.acceptedOrders);
            this.modalService.createModal<IncomingOrderComponent>({
                content: IncomingOrderComponent,
            });
        }
        this.selectedIndex = index;
        this.orderDetail = this.vendorOrders[index];
    }

    getVendorOrders() {
        this.vendorOrdersService.getVendorOrders().subscribe((value) => {
            this.vendorOrders = value.result.items;
            this.orderDetail = this.vendorOrders[this.selectedIndex];
            // console.log(this.vendorOrders);
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
}
