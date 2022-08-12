import { Component, OnInit } from '@angular/core';
import { ModalService } from '@app/shared/common/modal/modal.service';
import { AssignTaskComponent } from '../modals/assign-task/assign-task.component';

@Component({
    selector: 'app-open-orders',
    templateUrl: './open-orders.component.html',
    styleUrls: ['./open-orders.component.css'],
})
export class OpenOrdersComponent implements OnInit {
    constructor(private modalService: ModalService) {}

    ngOnInit(): void {}

    openAssignTaskModal() {
        this.modalService.createModal<AssignTaskComponent>({
            content: AssignTaskComponent,
        });
    }
}
