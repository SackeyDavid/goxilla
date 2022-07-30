import { AfterContentInit, Component, OnInit } from '@angular/core';
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
export class OrderDetailComponent implements OnInit, AfterContentInit {
    url: string;
    serviceRequestId: any;
    requestDetails: any;
    requestDetailsImages: any;
    priority: string = 'Medium';

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
        // var ind3 = this.url.indexOf('/', ind2 + 1);

        this.serviceRequestId = this.url.substring(ind2 + 1);
    }

    ngOnInit(): void { }

    ngAfterContentInit() {
        this.getDetails();
    }

    getDetails() {
        if (this.serviceRequestId.length) {
            this.service.getServiceReqDetails(this.serviceRequestId).subscribe((value) => {
                this.requestDetails = value.result;
                this.requestDetailsImages = this.requestDetails.lightboxImages;
                console.log(this.requestDetails);
                console.log(this.requestDetailsImages);
                this.priority = this.requestDetails.serviceOrder.priority == 0 ? 'Low' : 1 ? 'Medium' : 'ASAP';
            });
        }
    }

    getYachtDetails() {
        if (this.requestDetails.yatchId.length) {
            this.yachtService.getYachtDetails(this.requestDetails.yatchId).subscribe((value) => {
                // this.yatchDetails = value.result.yatch;
            });
        }
    }

    getServiceDetails() {
        if (this.requestDetails.serviceId) {
            this.selectService.getServiceDetails(this.requestDetails.serviceId).subscribe((value) => {
                // this.serviceDetails = value.result.service;
            });
        }
    }

    getVendorDetails() {
        if (this.requestDetails.vendorId) {
            this.vendorService.getVendorDetails(this.requestDetails.vendorId).subscribe((value) => {
                // this.vendorDetails = value.result.vendor;
            });
        }
    }

    getDateFormatted(date: any) {
        return moment(date).format('DD/MM/YYYY h:mm A');
    }
}
