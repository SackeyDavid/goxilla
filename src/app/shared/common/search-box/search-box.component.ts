import { AfterViewInit, Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { SearchItem } from './search-item';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { v4 as uuid } from 'uuid';

@Component({
    selector: 'app-search-box',
    templateUrl: './search-box.component.html',
    styleUrls: ['./search-box.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => SearchBoxComponent),
        },
    ],
})
export class SearchBoxComponent implements OnInit {
    @Input() id: string = this.generateRandomID(10000, 100000);
    @Input() data: Array<SearchItem> = [];
    @Input() placeholder: string;
    @Input() addLabel: string;

    @Input() showAddButton = true;
    @Input() searchable = true;
    @Input() showIcon = false;

    @Output() addNewItem = new EventEmitter();
    @Output() getSelectedItem = new EventEmitter<SearchItem>();

    onChange = (value: SearchItem) => {};

    newList: Array<SearchItem> = [];
    selectedItem?: SearchItem;
    displayLabel = '';
    displayValue: any;

    showDrop: boolean = false;

    constructor() {
        document.addEventListener('click', () => {
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
        this.addNewItem.emit({ id: this.id, value: this.displayLabel });
    }

    registerOnChange(fn: (value: SearchItem) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {}

    writeValue(obj: any): void {}

    ngAfterViewInit(): void {
        document.getElementById(this.id)?.addEventListener('click', () => {
            const ele = document.getElementsByClassName('search-drop-container');
            for (let i = 0; i < ele.length; i++) {
                if (!ele.item(i)?.classList.contains('hidden')) {
                    ele.item(i)?.classList.add('hidden');
                }
            }
            document.getElementsByClassName(this.id).item(0)?.classList.remove('hidden');
        });
    }

    generateRandomID(min: number, max: number) {
        return (Math.random() * (max - min) + min).toFixed(0);
    }
}
