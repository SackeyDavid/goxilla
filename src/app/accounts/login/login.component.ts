import { Component, OnInit } from '@angular/core';
import {SearchItem} from "@app/shared/common/search-box/search-item";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

    list: Array<SearchItem> = [
        {
            id: 1,
            value: 'Sam'
        },
        {
            id: 2,
            value: 'John'
        },
        {
            id: 3,
            value: 'Ray'
        }
    ];

    getSelecteditem(item: SearchItem) {
        console.log('selected', item)
    }

    addnew(item: string) {
        console.log('new item', item);
    }
}
