import { Component, OnInit } from '@angular/core';
import { RequestServiceService } from './request-service.service';

@Component({
    selector: 'app-request-service',
    templateUrl: './request-service.component.html',
    styleUrls: ['./request-service.component.css'],
})
export class RequestServiceComponent implements OnInit {
    step: number = 1;
    showStepOne: boolean = true;
    showStepTwo: boolean = false;
    lightboxImages: any = [];

    constructor(public service: RequestServiceService) {}

    ngOnInit(): void {}

    showNext(): void {
        this.showStepOne = !this.showStepOne;
        this.showStepTwo = !this.showStepTwo;
        this.step = 2;
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
}
