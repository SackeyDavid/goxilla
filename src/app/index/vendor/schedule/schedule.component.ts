import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import * as moment from 'moment';
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import { map } from 'rxjs/operators';
import { ScheduleService } from './schedule.service';
import { ScheduleServiceOrderService } from './schedule-service-order.service';

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.css'],
    encapsulation: ViewEncapsulation.Emulated,
})
export class ScheduleComponent implements OnInit {
    techJson: any = [];
    techListEventsJson: any[] = [];

    calendarOptions: CalendarOptions = {
        schedulerLicenseKey: '0643768602-fcs-1660191881',
        //height: '1500px',
        headerToolbar: false,
        initialView: 'resourceTimeline',
        lazyFetching: false,
        plugins: [resourceTimelinePlugin, interactionPlugin],
        weekNumberCalculation: 'ISO',
        slotDuration: '00:30:00',
        nowIndicator: true,
        editable: true,
        fixedWeekCount: false,
        showNonCurrentDates: false,
        dragScroll: true,
        droppable: true,
        resourceAreaWidth: '200px',
        resourceAreaHeaderContent: 'Technicians',
        timeZone: 'UTC',
        aspectRatio: 2.5,
        resources: this.techListEventsJson,

        events: [
            {
                id: '1',
                resourceId: '1',
                title: 'Meeting',
                startStr: '2022-08-13T13:15:00.000',
                endStr: '2022-08-13T15:15:00.000',
            },
        ],
        views: {
            resourceTimelineDay: {
                buttonText: ':30 slots',
                slotDuration: '00:30',
            },
            resourceTimelineTenDay: {
                type: 'resourceTimeline',
                duration: { days: 10 },
                buttonText: '10 days',
            },
        },
        eventDragStart: function (a) {
            console.log('Drag start', a);
        },
        eventDragStop: function (a) {
            console.log('Drag stop', a);
        },
    };

    constructor(private service: ScheduleService, private scheduleOrderService: ScheduleServiceOrderService) {}

    ngOnInit(): void {
        this.getAllTechnicians();
        this.getAllServiceOrderSchedules();
        this.getAllServiceOrders();
        this.getServiceOrderForEdit(515);
    }

    async getAllTechnicians() {
        this.techJson = {
            totalCount: 5,
            items: [
                {
                    id: 1,
                    displayName: 'Richard Adu',
                },
                {
                    id: 2,
                    displayName: 'David Sackey',
                },
                {
                    id: 3,
                    displayName: 'Hermann Mornah',
                },
                {
                    id: 4,
                    displayName: 'Konlan Mikpekoah',
                },
                {
                    id: 5,
                    displayName: 'Benard Ossei-Agyei',
                },
            ],
        };

        this.techJson.items.forEach((tech: any) => {
            let obj = { id: tech.id, title: tech.displayName, eventDurationEditable: true };

            this.techListEventsJson.push(obj);
        });

        return this.techListEventsJson;
    }

    getAllServiceOrderSchedules() {
        this.scheduleOrderService.getAllServiceOrderSchedulesForLookupTable().subscribe(
            (response) => {
                console.log('response');
                console.log(response);
                console.log(JSON.stringify(response));
                //return  response.body.json()
            },
            (err) => {
                console.log(err);
            }
        );
    }

    getAllServiceOrders() {
        this.service.getAll().subscribe(
            (response) => {
                console.log('service order response');
                console.log(response);
                console.log(JSON.stringify(response));
                //return  response.body.json()
            },
            (err) => {
                console.log(err);
            }
        );
    }

    getServiceOrderForView() {
        this.service.getServiceOrderForView().subscribe(
            (response) => {
                console.log('service order response');
                console.log(response);
                console.log(JSON.stringify(response));
                //return  response.body.json()
            },
            (err) => {
                console.log(err);
            }
        );
    }

    getServiceOrderForEdit(id: any) {
        this.service.getServiceOrderForEdit(id).subscribe(
            (response) => {
                console.log('service order response');
                console.log(response);
                console.log(JSON.stringify(response));
                //return  response.body.json()
            },
            (err) => {
                console.log(err);
            }
        );
    }
}
