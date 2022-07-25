/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { YatchDetailsService } from './yatch-details.service';

describe('Service: SelectYatch', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [YatchDetailsService],
        });
    });

    it('should ...', inject([YatchDetailsService], (service: YatchDetailsService) => {
        expect(service).toBeTruthy();
    }));
});
