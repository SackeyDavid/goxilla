import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-full-screen-modal',
  templateUrl: './full-screen-modal.component.html',
  styleUrls: ['./full-screen-modal.component.css']
})
export class FullScreenModalComponent implements OnInit {
  @Input() placeItemsEnd = false;
  @Input() showMainBackground = false;
  constructor() { }

  ngOnInit(): void {
  }

}
