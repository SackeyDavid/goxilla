/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ScheduleServiceOrderService } from './schedule-service-order.service';

describe('Service: ScheduleServiceOrder', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScheduleServiceOrderService]
    });
  });

  it('should ...', inject([ScheduleServiceOrderService], (service: ScheduleServiceOrderService) => {
    expect(service).toBeTruthy();
  }));
});
