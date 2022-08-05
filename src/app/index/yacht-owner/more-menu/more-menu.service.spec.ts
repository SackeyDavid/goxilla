/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MoreMenuService } from './more-menu.service';

describe('Service: MoreMenu', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MoreMenuService]
    });
  });

  it('should ...', inject([MoreMenuService], (service: MoreMenuService) => {
    expect(service).toBeTruthy();
  }));
});
