/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { YachtDetailsService } from './yacht-details.service';

describe('Service: SelectYatch', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [YachtDetailsService],
        });
    });

    it('should ...', inject([YachtDetailsService], (service: YachtDetailsService) => {
        expect(service).toBeTruthy();
    }));
});
