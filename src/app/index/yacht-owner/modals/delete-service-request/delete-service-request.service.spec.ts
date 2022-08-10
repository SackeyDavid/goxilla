/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DeleteServiceRequestService } from './delete-service-request.service';

describe('Service: DeleteServiceRequest', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeleteServiceRequestService]
    });
  });

  it('should ...', inject([DeleteServiceRequestService], (service: DeleteServiceRequestService) => {
    expect(service).toBeTruthy();
  }));
});
