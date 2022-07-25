/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SelectServiceService } from './select-service.service';

describe('Service: SelectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectServiceService]
    });
  });

  it('should ...', inject([SelectServiceService], (service: SelectServiceService) => {
    expect(service).toBeTruthy();
  }));
});
