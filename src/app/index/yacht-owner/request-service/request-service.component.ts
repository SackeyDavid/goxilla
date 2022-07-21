import { Component, OnInit } from '@angular/core';
import { ModalService } from '@app/shared/modal/modal.service';
import { AddVendorComponent } from '../add-vendor/add-vendor.component';
import { RequestServiceService } from './request-service.service';

@Component({
    selector: 'app-request-service',
    templateUrl: './request-service.component.html',
    styleUrls: ['./request-service.component.css'],
})
export class RequestServiceComponent implements OnInit {
    showStepOne: boolean = true;
    showStepTwo: boolean = false;
    lightboxImages: any = [];

    constructor(public service: RequestServiceService, private modalService: ModalService) {}

    ngOnInit(): void {}

    showNext(): void {
        this.showStepOne = !this.showStepOne;
        this.showStepTwo = !this.showStepTwo;
    }

    addPicture(event: any) {
        if (event.target.files && event.target.files[0]) {
            for (const image of event.target.files) {
                const reader = new FileReader();
                reader.onload = (event: any) => {
                    this.lightboxImages.push({ name: image.name, size: image.size, path: event.target.result });
                    this.lightboxImages.reverse();
                    event.target.value = '';
                };

                reader.readAsDataURL(image);
            }
        }
    }

    openAddVendorModal() {
        this.modalService.createModal<AddVendorComponent>({
            content: AddVendorComponent,
        });
    }
}
