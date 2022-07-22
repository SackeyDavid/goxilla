import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SearchItem } from './search-item';

@Component({
    selector: 'app-search-box',
    templateUrl: './search-box.component.html',
    styleUrls: ['./search-box.component.css'],
})
export class SearchBoxComponent implements OnInit {
    @Input() data: Array<SearchItem> = [];
    @Input() placeholder: string = 'Email';
    @Input() addText: string = 'Add New';

    newList: Array<SearchItem> = [];

    showDrop = false;
    selectedItem?: SearchItem;
    displayLabel = '';
    displayValue: any;

    @Output() addNewItem = new EventEmitter();
    @Output() getSelectedItem = new EventEmitter<SearchItem>();
    constructor() {
        document.addEventListener('click', () => {
            // console.log(document.activeElement?.attributes.getNamedItem('searchbox')?.value);
            const item = document.activeElement?.attributes.getNamedItem('searchbox');
            this.showDrop = item?.value === 'pi-search-box';
        });
    }

    ngOnInit(): void {
        this.newList = this.data;
    }

    selectItem(item: SearchItem) {
        this.selectedItem = item;
        this.displayLabel = this.selectedItem.value;
        this.displayValue = this.selectedItem.id;
        this.getSelectedItem.emit(item);
        // console.log(this.selectedItem);
    }

    searchList(value: string) {
        this.data = this.newList;
        this.data = [...this.data.filter((item) => String(item.value).toLowerCase().includes(value.toLowerCase()))];
    }

    addNew() {
        this.addNewItem.emit(this.displayLabel);
    }
}
