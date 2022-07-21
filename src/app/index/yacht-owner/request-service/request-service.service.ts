import { Injectable } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Injectable({
    providedIn: 'root',
})
export class RequestServiceService {
    vendors: any[];
    selectedVendor: any;
    items: SelectItem[];

    constructor() {
        this.vendors = [
            { name: 'Juan the Boat guy', id: '0' },
            { name: 'Albert Kopler', id: '1' },
            { name: 'John Wick', id: '2' },
            { name: 'Morris Joe', id: '3' },
        ];
    }
}
