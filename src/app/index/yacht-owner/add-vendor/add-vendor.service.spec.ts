/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AddVendorService } from './add-vendor.service';

describe('Service: AddVendor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddVendorService]
    });
  });

  it('should ...', inject([AddVendorService], (service: AddVendorService) => {
    expect(service).toBeTruthy();
  }));
});
