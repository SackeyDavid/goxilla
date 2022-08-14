import { TestBed } from '@angular/core/testing';

import { OpenOrdersService } from './open-orders.service';

describe('OpenOrdersService', () => {
  let service: OpenOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
