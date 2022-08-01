import { Component, OnInit } from '@angular/core';
import { SelectServiceService } from '../../select-service/select-service.service';
import * as moment from 'moment';

@Component({
    selector: 'app-all-requests',
    templateUrl: './all-requests.component.html',
    styleUrls: ['./all-requests.component.css'],
})
export class AllRequestsComponent implements OnInit {
    allServiceOrders: any = [];
    searchPhrase: string;
    requestDetails: any;
    searching: boolean = false;

    constructor(private selectService: SelectServiceService) {}

    ngOnInit(): void {
        this.getAllServiceOrders();
    }

    getAllServiceOrders() {
        this.selectService.getAllServiceOrders().subscribe((value) => {
            this.allServiceOrders = value.result.items;
            this.allServiceOrders = this.allServiceOrders.reverse();
            this.requestDetails = this.allServiceOrders[0];
            console.log(this.requestDetails);
        });
    }

    getDateFormatted(date: any) {
        return moment(date).format('MM/DD/YYYY');
    }

    getDetailsDateFormatted(date: any) {
        return moment(date).format('DD/MM/YYYY h:mm A');
    }

    searchServiceOrder() {
        if (this.searchPhrase.length) {
            this.searching = true;
            this.selectService.searchServiceOrders(this.searchPhrase).subscribe((value) => {
                this.allServiceOrders = value.result.items;
                this.searching = false;
            });
        } else {
            this.getAllServiceOrders();
        }
    }

    getFormatedImageUrl(imageUrl: string) {
        let newImageUrl = imageUrl.slice(0, -4);
        newImageUrl = newImageUrl + 'raw=1';
        return newImageUrl;
    }
}
