import { Injectable } from '@angular/core';
import { BaseService } from '@app/shared/base.service';
import { SearchItem } from '@app/shared/common/search-box/search-item';
import { VendorService } from '../add-vendor/vendor.service';
import { SelectServiceService } from '../select-service/select-service.service';
import { YatchDetailsService } from '../yatch-details/yatch-details.service';

@Injectable({
    providedIn: 'root',
})
export class RequestServiceService {
    vendorsList: Array<SearchItem>;
    servicesList: Array<SearchItem>;
    yatchsList: Array<SearchItem>;

    constructor(
        private vendorService: VendorService,
        private baseService: BaseService,
        public selectService: SelectServiceService,
        public yatchDetailsService: YatchDetailsService
    ) {
        //using dummy data before replacing with API list
        this.vendorsList = [
            { id: 0, value: 'Juan the Boats Guy' },
            { id: 1, value: 'Albert Kopler' },
            { id: 2, value: 'John Doe' },
            { id: 3, value: 'Scott Williams' },
        ];
        this.getAllVendors();
        this.getAllServices();
        this.getAllYatchs();
    }

    getAllVendors() {
        this.vendorService.getVendors().subscribe((value) => {
            this.vendorsList = value.result.items;
        });
    }

    getAllServices() {
        this.selectService.getServices().subscribe((value) => {
            this.servicesList = value.result.items;
        });
    }

    getAllYatchs() {
        this.yatchDetailsService.getAllYatchs().subscribe((value) => {
            this.yatchsList = value.result.items;
        });
    }
}
