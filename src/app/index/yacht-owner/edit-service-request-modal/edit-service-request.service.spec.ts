import { TestBed } from '@angular/core/testing';

import { EditServiceRequestService } from './edit-service-request.service';

describe('EditServiceRequestService', () => {
  let service: EditServiceRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditServiceRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
