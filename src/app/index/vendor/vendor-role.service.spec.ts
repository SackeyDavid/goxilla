/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VendorService } from './vendor-role.service';

describe('Service: Vendor', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [VendorService],
        });
    });

    it('should ...', inject([VendorService], (service: VendorService) => {
        expect(service).toBeTruthy();
    }));
});
