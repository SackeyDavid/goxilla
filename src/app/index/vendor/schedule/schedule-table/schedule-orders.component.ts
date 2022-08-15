import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ScheduleService } from '../schedule.service';
import { DatePipe } from '@angular/common';
import { Event } from '@angular/router';
import { ModalService } from '@app/shared/common/modal/modal.service';
import { filter } from 'lodash-es';
import { AssignTechnicianComponent } from '../../modals/assign-technician/assign-technician.component';

@Component({
    selector: 'app-schedule-orders',
    templateUrl: './schedule-orders.component.html',
    styleUrls: ['./schedule-orders.component.css'],
})
export class ScheduleOrdersComponent implements OnInit {
    serviceOrders: any = [];
    serviceOrdersCount: number;
    serviceOrderPages: number;
    selected: number = 1;
    serviceOrderPagesArray: any[] = [];
    pipe = new DatePipe('en-US');
    todayWithPipe = null;
    selectedShift: any = {};

    @Output() newCalendarEvent = new EventEmitter<any>();

    constructor(private serviceOrderService: ScheduleService, private modalService: ModalService) {}

    ngOnInit(): void {
        this.getServiceOrdersByPage(1);
        this.serviceOrderPages = this.getServiceOrdersCount();
        // this.eventsSubscription = this.events.subscribe(({data}) => console.log(data));
    }

    formatDate(date): DatePipe {
        this.todayWithPipe = this.pipe.transform(date, 'M/d/yy h:mm a');
        return this.todayWithPipe;
    }

    createEventObject(selectedShift, title) {
        console.log(selectedShift);
        console.log(title);

        var event = {
            title: title,
            startTime: selectedShift,
            //duration: { hours: event_duration }
            //color: '#7FFF00'
        };

        console.log(event);

        return event;
    }

    dragServiceOrder(event: Event, order: any) {
        console.log('drag start =>', order);
        // console.log('drag event =>',event);
        this.newCalendarEvent.emit(order);
    }

    dragEnd(event: Event, order: any) {
        console.log('drag end  =>', order);
        //console.log('drag event =>',event);
    }

    onClickServiceOrder(event, serviceOrder) {
        this.selectedShift = { name: serviceOrder.service.name, value: serviceOrder.service.name };

        var serviceOrderDetails = {
            id: serviceOrder.id,
            name: serviceOrder.name,
        };
    }

    getServiceOrdersByPage(page: number) {
        this.serviceOrderService.getServiceOrdersByPage(page).subscribe((response) => {
            if (response.success === true) {
                this.serviceOrders = response.result.items;
            }
        });
    }

    getServiceOrdersCount(): any {
        this.serviceOrderService.getAllServiceOrders().subscribe(
            (response: any) => {
                console.log('service order count response');
                this.serviceOrdersCount = response.totalCount;
                console.log(this.serviceOrdersCount);
                let pages = this.serviceOrdersCount / 5;
                let modulus = this.serviceOrdersCount % 5;

                if (modulus > 0) {
                    pages + 1;
                }

                for (let i = 0; i < pages; i++) {
                    this.serviceOrderPagesArray.push(i + 1);
                }

                console.log('countResponse', pages);
                return pages;
            },
            (err) => {
                console.log(err);
            }
        );
    }

    getNextServiceOrders(page: number) {
        this.selected = page;
        this.getServiceOrdersByPage(page);
    }

    nextClick() {
        //this.selected = page+1;
        this.getServiceOrdersByPage(this.selected + 1);
    }

    previousClick() {
        //this.selected = page-1;
        this.getServiceOrdersByPage(this.selected - 1);
    }

    assignTechnicianModal(order: any) {
        sessionStorage.setItem('serviceOrderNoTechnicianDetails', JSON.stringify(order));
        this.modalService.createModal<any>({
            content: AssignTechnicianComponent,
        });
    }

    filterServiceOrders(field: any) {
        //this.serviceOrders.filter((a:any)=> a
    }
}
