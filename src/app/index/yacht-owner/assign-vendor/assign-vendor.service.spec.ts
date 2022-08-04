import { TestBed } from '@angular/core/testing';

import { AssignVendorService } from './assign-vendor.service';

describe('AssignVendorService', () => {
  let service: AssignVendorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignVendorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
