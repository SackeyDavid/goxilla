import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CalendarOptions, EventDropArg, EventInput } from '@fullcalendar/angular'; // useful for typechecking
import * as moment from 'moment';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin, { Draggable, DropArg, EventReceiveArg } from '@fullcalendar/interaction';
import resourceTimelinePlugin, { ResourceTimelineLane } from '@fullcalendar/resource-timeline';
import { ScheduleService } from './schedule.service';
import { ScheduleServiceOrderService } from './schedule-service-order.service';

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.css'],
})
export class ScheduleComponent implements OnInit {
    techJson: any = [];
    techListEventsJson: any = [];
    calendarResources: any = [];
    // calendarResources=[
    //     {id:'1', title:'Tech 1'},
    //     {id:'2', title:'Tech 2'},
    //     {id:'3', title:'Tech 3'}
    // ];

    calendarEvent: any = [];

    calendarOptions: CalendarOptions = {
        schedulerLicenseKey: '0643768602-fcs-1660191881',
        //defaultDate: '2017-02-01',
        headerToolbar: false,
        initialView: 'resourceTimeline',
        lazyFetching: false,
        plugins: [resourceTimelinePlugin, dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
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
        aspectRatio: 2.0,
        needsResourceData: true,
        resources: this.calendarResources,
        events: this.calendarEvent,
        views: {
            resourceTimelineDay: {
                buttonText: ':30 slots',
                slotDuration: '00:30',
            },
        },
        eventDragStart: (a) => {
            console.log('Drag start', a.event._instance.range);
            console.log('Drag stop', a.event._instance.range);
            console.log('Drag stop', a.event._instance.range);
            console.log('user Id /resource id', a.event._def.sourceId);
        },
        eventDragStop: (a) => {
            console.log('Drag start', a.event._instance.range);
            console.log('Drag stop', a.event._instance.range);
            console.log('Drag stop', a.event._instance.range);
            console.log('user Id /resource id', a.event._def.sourceId);
        },
        eventClick: (a) => {
            console.log(a.view.title);
            //display tooltip showing more details

            console.log('event click', a);
        },
        eventDrop: (a) => {
            console.log('event drop', a);
            console.log('start time', a.event._instance.range.start);
            console.log('end time', a.event._instance.range.start);
            console.log('title', a.event._def.title);
            console.log('user Id /resource id', a.event._def.sourceId);
        },
        eventReceive: (eventReceiveEvent: EventReceiveArg) => {
            console.log('comming from calendar drop event=>', eventReceiveEvent);
            console.log('comming from calendar drop event=>', eventReceiveEvent.draggedEl.ondrop);
            var getUserId = eventReceiveEvent.relatedEvents.map((a: any) => console.log(a));
            console.log('USER ID', getUserId);
            //this.eventService.addEvent(eventReceiveEvent);
            //this.eventReceive();
        },
        //   drop: (info: DropArg) => {
        //     // is the "remove after drop" checkbox checked?
        //     console.log('drop info=======>');
        //     console.log(info);
        //   },
        //function( date, jsEvent, ui ) { }
        drop: (info: DropArg) => {
            // is the "remove after drop" checkbox checked?
            console.log('drop info=======>');
            console.log(info);
        },
        eventAdd: (e) => {
            console.log('added event');
        },
        resourceLaneContent: (e) => {
            // console.log('resource group event', e);
        },
        select: (e) => {
            console.log('selected resource', e);
        },
        dayCellContent: (e) => {
            console.log('day cell resource', e);
        },
    };

    constructor(
        private serviceOrderService: ScheduleService,
        private serviceOrderScheduleService: ScheduleServiceOrderService
    ) {}

    ngOnInit(): void {
        this.getAllTechnicians();
        this.getAllServiceOrderSchedules();
        // this.getServiceOrderForEdit(515);
        //this.getServiceOrderForView()
    }

    ngAfterViewInit() {}

    eventReceive(newItem: any) {
        // console.log('calender items received', newItem);
        this.createCalanderEvents(newItem);
    }

    createCalanderEvents(data: any) {
        let event: EventInput = {};
        event.id = data.service.id;
        event.resourceId = '1';
        event.title = data.service.name;
        event.start = data.serviceOrder.creationTime;
        event.end = data.serviceOrder.expectedDeliveryDat;
        event.color = 'green';

        //this.calendarEvent.push(event);
    }

    getAllTechnicians() {
        this.serviceOrderScheduleService.getAllTechnicians().subscribe(
            (response: any) => {
                // console.log('get technicians response');
                // console.log(response);
                if (response.items.length > 0) {
                    this.techJson = response.items;
                    this.techJson.forEach((tech: any) => {
                        let obj = { id: tech.technician.id, title: tech.technician.name };

                        this.calendarResources.push(obj);
                    });

                    // console.log('technician list for calendar => ', this.calendarResources);

                    return this.calendarResources;
                } else {
                    return this.calendarResources;
                }
            },
            (err) => {
                console.log(err);
            }
        );
    }

    getAllServiceOrderSchedules() {
        this.serviceOrderScheduleService.getAllServiceSchedules().subscribe(
            (response) => {
                // console.log('service schesules response');
                // console.log(response);
            },
            (err) => {
                console.log(err);
            }
        );
    }

    //   getAllServiceOrders(){
    //     this.serviceOrderService.getAll()
    //             .subscribe(response => {
    //                 console.log('service order response');
    //                 console.log(response);
    //                 console.log(JSON.stringify(response));
    //                 //return  response.body.json()
    //             }, err=>{
    //                 console.log(err)
    //             })
    //   }

    //   getServiceOrderForView(){
    //     this.serviceOrderService.getServiceOrderForView()
    //             .subscribe(response => {
    //                 console.log('service order for view response');
    //                 console.log(response);
    //             }, err=>{
    //                 console.log(err)
    //             })
    //   }

    getServiceOrderForEdit(id: any) {
        this.serviceOrderService.getServiceOrderForEdit(id).subscribe(
            (response) => {
                // console.log('service order response');
                // console.log(response);
            },
            (err) => {
                console.log(err);
            }
        );
    }

    dragEnd(event) {
        console.log('event drop', event);
    }

    onDragDrop(event) {
        console.log('drap drop event on calendar log', event);
    }
}
