import { TestBed } from '@angular/core/testing';

import { YachtOwnerService } from './yacht-owner.service';

describe('YachtOwnerService', () => {
  let service: YachtOwnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YachtOwnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
