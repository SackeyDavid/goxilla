import { Component, OnInit } from '@angular/core';
import { SelectServiceService } from '../../select-service/select-service.service';

@Component({
    selector: 'app-all-requests',
    templateUrl: './all-requests.component.html',
    styleUrls: ['./all-requests.component.css'],
})
export class AllRequestsComponent implements OnInit {
    allServiceOrders: any = [];

    constructor(private selectService: SelectServiceService) {}

    ngOnInit(): void {
        this.getAllServiceOrders();
    }

    getAllServiceOrders() {
        this.selectService.getAllServiceOrders().subscribe((value) => {
            this.allServiceOrders = value.result;
            console.log(value.result);
        });
    }
}
