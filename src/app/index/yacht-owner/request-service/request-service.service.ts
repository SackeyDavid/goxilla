import { Injectable } from '@angular/core';
import { SearchItem } from '@app/shared/common/search-box/search-item';

@Injectable({
    providedIn: 'root',
})
export class RequestServiceService {
    list: Array<SearchItem>;

    constructor() {
        this.list = [
            { id: '0', value: 'Juan the Boat guy' },
            { id: '1', value: 'Albert Kopler' },
            { id: '2', value: 'John Wick' },
            { id: '3', value: 'Morris Joe' },
        ];
    }
}
