import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
    priority: string;

    constructor(
        private router: Router,
        private service: OrderDetailService,
        private yachtService: YachtDetailsService,
        private vendorService: VendorService,
        private selectService: SelectServiceService,
        private activatedRoute: ActivatedRoute
    ) {
        this.activatedRoute.paramMap.subscribe((params) => {
            let serviceRequestId = params.get('id');
            this.serviceRequestId = serviceRequestId;
            // console.log(serviceRequestId);
        });

        if (!this.serviceRequestId) {
            this.url = decodeURI(this.router.url);
            var ind1 = this.url.indexOf('/');
            var ind2 = this.url.indexOf('/', ind1 + 1);
            // var ind3 = this.url.indexOf('/', ind2 + 1);

            this.serviceRequestId = this.url.substring(ind2 + 1);
        }
    }

    ngOnInit(): void {}

    ngAfterContentInit() {
        this.getDetails();
    }

    getDetails() {
        if (this.serviceRequestId.length) {
            this.service.getServiceReqDetails(this.serviceRequestId).subscribe((value) => {
                this.requestDetails = value.result;
                this.requestDetailsImages = this.requestDetails.lightboxImages;
                this.priority =
                    this.requestDetails.serviceOrder.priority == 4
                        ? 'Affect Ship Shape'
                        : 3
                        ? 'ASAP'
                        : 2
                        ? 'Normal'
                        : 1
                        ? 'Medium'
                        : 'Low';
            });
        }
    }

    getDateFormatted(date: any) {
        return moment(date).format('MM/DD/YYYY h:mm A');
    }

    getFormatedImageUrl(imageUrl: string) {
        let newImageUrl = imageUrl.slice(0, -4);
        newImageUrl = newImageUrl + 'raw=1';
        return newImageUrl;
    }

    /*
        Below functions are not being used
        May be used later to fetch data on authenticated routes or using ids
    */
    getYachtDetails() {
        if (this.requestDetails.yatchId.length) {
            this.yachtService.getYachtDetails(this.requestDetails.yatchId).subscribe((value) => {
                // this.yatchDetails = value.result.yatch;
                console.log(value.result.yacht);
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
}
