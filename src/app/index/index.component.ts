import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ModalService} from "@app/shared/common/modal/modal.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private compRef: ViewContainerRef, private modalService: ModalService) {
      modalService.mainComponent = this.compRef;
  }

  ngOnInit(): void {
  }

}
