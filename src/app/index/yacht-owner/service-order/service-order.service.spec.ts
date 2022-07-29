/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ServiceOrderService } from './service-order.service';

describe('Service: ServiceOrder', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceOrderService]
    });
  });

  it('should ...', inject([ServiceOrderService], (service: ServiceOrderService) => {
    expect(service).toBeTruthy();
  }));
});
