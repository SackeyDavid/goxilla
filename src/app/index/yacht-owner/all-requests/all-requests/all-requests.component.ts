import { Component, EventEmitter, Output, OnInit, Injector } from '@angular/core';
import { SelectServiceService } from '../../select-service/select-service.service';
import { EditServiceRequestModalComponent } from '../../edit-service-request-modal/edit-service-request-modal.component';
import { AssignVendorComponent } from '../../assign-vendor/assign-vendor.component';
import { ModalService } from '@app/shared/common/modal/modal.service';
import { AppService } from '@app/services/app.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import * as moment from 'moment';
import { DeleteServiceRequestComponent } from '../../modals/delete-service-request/delete-service-request.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-all-requests',
    templateUrl: './all-requests.component.html',
    styleUrls: ['./all-requests.component.css'],
})
export class AllRequestsComponent extends AppComponentBase implements OnInit {
    allServiceOrders: any = [];
    searchPhrase: string;
    requestDetails: any;
    searching: boolean = false;
    selectedIndex: number = 0;

    constructor(
        injector: Injector,
        private selectService: SelectServiceService,
        private modalService: ModalService,
        public AppService: AppService,
        private router: Router
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.getAllServiceOrders();
    }

    getAllServiceOrders() {
        this.showMainSpinner();

        this.selectService.getAllServiceOrders().subscribe((value) => {
            this.allServiceOrders = value.result.items;
            this.requestDetails = this.allServiceOrders[this.selectedIndex];
            this.hideMainSpinner();
            /* this.AppService.setStorageItem('requestDetails', this.allServiceOrders[0]); */
        });
    }

    getDateFormatted(date: any) {
        if (date) return moment(date).format('MM/DD/YYYY');
        return '';
    }

    getDetailsDateFormatted(date: any) {
        if (date) return moment(date).format('MM/DD/YYYY h:mm A');
        return '';
    }

    searchServiceOrder() {
        if (this.searchPhrase.length) {
            this.searching = true;
            this.selectService.searchServiceOrders(this.searchPhrase).subscribe((value) => {
                this.allServiceOrders = value.result.items;
                this.searching = false;
            });
        } else {
            this.getAllServiceOrders();
        }
    }

    getFormatedImageUrl(imageUrl: string) {
        let newImageUrl = imageUrl.slice(0, -4);
        newImageUrl = newImageUrl + 'raw=1';
        return newImageUrl;
    }

    displayOrderDetails(index: number) {
        this.selectedIndex = index;
        sessionStorage.setItem('selectedIndex', String(index));
        this.requestDetails = this.allServiceOrders[index];
        /* this.AppService.setStorageItem('requestDetails', this.requestDetails); */
    }

    clearSearch() {
        this.searchPhrase = '';
        this.searchServiceOrder();
    }

    openAssignVendorModal() {
        this.modalService.createModal<AssignVendorComponent>({
            content: AssignVendorComponent,
        });
    }

    openDeleteServiceRequestModal() {
        this.AppService.setStorageItem('requestDetails', this.requestDetails);
        this.modalService.createModal<DeleteServiceRequestComponent>({
            content: DeleteServiceRequestComponent,
        });
    }

    goToRequestService() {
        this.router.navigateByUrl('/app/request-service');
    }

    openServiceRequestEditModal() {
        // sessionStorage.setItem('order_edit_item', this.requestDetails);
        this.AppService.setStorageItem('requestDetails', this.requestDetails);
        this.modalService.createModal<EditServiceRequestModalComponent>({
            content: EditServiceRequestModalComponent,
        });
    }

    emitItem(item: any) {
        this.AppService.setStorageItem('requestDetails', item);
    }
}
