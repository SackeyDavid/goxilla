import { Injectable } from '@angular/core';
import { BaseService } from '@app/shared/base.service';
import { SearchItem } from '@app/shared/common/search-box/search-item';
import { VendorService } from '../add-vendor/vendor.service';

@Injectable({
    providedIn: 'root',
})
export class RequestServiceService {
    list: Array<SearchItem>;

    constructor(private vendorService: VendorService, private baseService: BaseService) {
        this.getVendors();
    }

    getVendors() {
        this.vendorService.getVendors().subscribe((value) => {
            this.baseService.setSession(this.baseService.vendorData, this.list);
            this.list = value.result.items;
            console.log('list ', this.list);
            this.baseService.vendorListSource.next(value.result.items);
            this.baseService.vendorSource.next(value.result.totalCount);
        });
    }
}
