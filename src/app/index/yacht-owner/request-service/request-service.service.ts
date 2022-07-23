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
        //using dummy data before replacing with API list
        this.list = [
            { id: 0, value: 'Juan the Boats Guy' },
            { id: 1, value: 'Albert Kopler' },
            { id: 2, value: 'John Doe' },
            { id: 3, value: 'Scott Williams' },
        ];
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
