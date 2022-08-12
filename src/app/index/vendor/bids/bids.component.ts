import { Component, OnInit } from '@angular/core';
import { ModalService } from '@app/shared/common/modal/modal.service';
import { MakeABidComponent } from './make-a-bid/make-a-bid.component';

@Component({
    selector: 'app-bids',
    templateUrl: './bids.component.html',
    styleUrls: ['./bids.component.css'],
})
export class BidsComponent implements OnInit {
    constructor(private modalService: ModalService) {}

    ngOnInit(): void {}

    openMakeABidModal() {
        this.modalService.createModal<MakeABidComponent>({
            content: MakeABidComponent,
        });
    }
}
