import { Component, OnInit } from '@angular/core';
import { ModalService } from '@app/shared/common/modal/modal.service';
import { AssignTaskComponent } from '../modals/assign-task/assign-task.component';
import { AssignTechnicianComponent } from '../modals/assign-technician/assign-technician.component';
import { IncomingOrderComponent } from '../modals/incoming-order/incoming-order.component';
import { OpenOrdersService } from './open-orders.service';

@Component({
    selector: 'app-open-orders',
    templateUrl: './open-orders.component.html',
    styleUrls: ['./open-orders.component.css'],
})
export class OpenOrdersComponent implements OnInit {

    vendorOrders: any;

    constructor(
        private modalService: ModalService,
        private vendorOrdersService: OpenOrdersService,
    ) { }

    ngOnInit(): void {
        this.getVendorOrders();
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

    openAcceptIncomingOrderModal() {
        this.modalService.createModal<IncomingOrderComponent>({
            content: IncomingOrderComponent,
        });
    }

    getVendorOrders() {
        this.vendorOrdersService.getVendorOrders().subscribe((value) => {
            this.vendorOrders = value.result.items;
            console.log(this.vendorOrders);
        });
    }

}
