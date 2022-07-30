import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '@app/shared/base.service';
import { VendorService } from '../add-vendor/vendor.service';
import { SelectServiceService } from '../select-service/select-service.service';
import { YachtDetailsService } from '../yacht-details/yacht-details.service';
import { OrderDetailService } from './order-detail.service';
import * as moment from 'moment';

@Component({
    selector: 'app-order-detail',
    templateUrl: './order-detail.component.html',
    styleUrls: ['./order-detail.component.css'],
})
export class OrderDetailComponent implements OnInit {
    url: string;
    serviceRequestId: any;
    requestDetails: any;
    serviceDetails: any;
    yatchDetails: any;
    priority: string;
    vendorDetails: any;

    constructor(
        private router: Router,
        private service: OrderDetailService,
        private yachtService: YachtDetailsService,
        private vendorService: VendorService,
        private selectService: SelectServiceService
    ) {
        this.url = decodeURI(this.router.url);
        var ind1 = this.url.indexOf('/');
        var ind2 = this.url.indexOf('/', ind1 + 1);
        var ind3 = this.url.indexOf('/', ind2 + 1);

        this.serviceRequestId = this.url.substring(ind3 + 1);
    }

    ngOnInit(): void {
        this.getDetails();
    }

    getDetails() {
        this.service.getServiceReqDetails(this.serviceRequestId).subscribe((value) => {
            this.requestDetails = value.result;
            this.getYachtDetails();
            this.getServiceDetails();
            this.getVendorDetails();
            this.priority = this.requestDetails.priority == 1 ? 'Low' : 2 ? 'Medium' : 'ASAP';
        });
    }

    getYachtDetails() {
        this.yachtService.getYachtDetails(this.requestDetails.yatchId).subscribe((value) => {
            this.yatchDetails = value.result.yatch;
        });
    }

    getServiceDetails() {
        this.selectService.getServiceDetails(this.requestDetails.serviceId).subscribe((value) => {
            this.serviceDetails = value.result.service;
        });
    }

    getVendorDetails() {
        this.vendorService.getVendorDetails(this.requestDetails.vendorId).subscribe((value) => {
            this.vendorDetails = value.result.vendor;
        });
    }

    getDateFormatted(date: any) {
        return moment(date).format('DD/MM/YYYY h:mm A');
    }
}
