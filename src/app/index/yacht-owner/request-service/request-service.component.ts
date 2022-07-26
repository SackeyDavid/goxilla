import { Component, OnInit } from '@angular/core';
import { AddVendorComponent } from '../add-vendor/add-vendor.component';
import { RequestServiceService } from './request-service.service';
import { ModalService } from '@app/shared/common/modal/modal.service';
import { SearchItem } from '@app/shared/common/search-box/search-item';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VendorService } from '../add-vendor/vendor.service';
import { SelectServiceService } from '../select-service/select-service.service';
import { YatchDetailsService } from '../yatch-details/yatch-details.service';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-request-service',
    templateUrl: './request-service.component.html',
    styleUrls: ['./request-service.component.css'],
})
export class RequestServiceComponent implements OnInit {
    showStepOne: boolean = true;
    showStepTwo: boolean = false;
    lightboxImages: any = [];
    form!: FormGroup;

    vendorsList: Array<SearchItem>;
    servicesList: Array<SearchItem>;
    yachtesList: Array<SearchItem>;

    constructor(
        public service: RequestServiceService,
        private fb: FormBuilder,
        private modalService: ModalService,
        private vendorService: VendorService,
        public selectService: SelectServiceService,
        public yatchDetailsService: YatchDetailsService
    ) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            id: [0],
            yacht: [null, Validators.required],
            service: [null, Validators.required],
            priority: [null, Validators.required],
            description: [null, Validators.required],
            location: [null],
            affectShipShape: true,
            taskList: [null],
            instruction: [null],
            bid_requested: [false, Validators.required],
        });

        //using dummy data before replacing with API list
        this.vendorsList = [
            { id: 0, value: 'Juan the Boats Guy' },
            { id: 1, value: 'Albert Kopler' },
            { id: 2, value: 'John Doe' },
            { id: 3, value: 'Scott Williams' },
        ];
        this.yachtesList = [
            { id: 0, value: 'Happy Place' },
            { id: 1, value: 'Happy Place 2' },
            { id: 2, value: 'Happy Place 3' },
            { id: 3, value: 'Happy Place 4' },
        ];
        this.servicesList = [
            { id: 0, value: 'Floor Wax' },
            { id: 1, value: 'Engine Service' },
            { id: 2, value: 'Camera Repair' },
            { id: 3, value: 'Air Conditioning Fix' },
        ];

        this.getAllVendors();
        this.getAllServices();
        this.getAllYatchs();
    }

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

    getSelectedVendor(item: SearchItem) {
        // console.log('selected', item);
    }

    addNewVendor(item: string) {
        // console.log('new item', item);
        sessionStorage.setItem('vendor_new_item', item);
        this.openAddVendorModal();
    }

    getSelectedService(item: SearchItem) {
        // console.log('selected', item);
    }

    addNewService(item: string) {
        // console.log('new item', item);
        sessionStorage.setItem('service_new_item', item);
    }

    getSelectedYacht(item: SearchItem) {
        // console.log('selected', item);
    }

    addNewYacht(item: string) {
        // console.log('new item', item);
        sessionStorage.setItem('yacht_new_item', item);
    }

    getAllVendors() {
        this.vendorService.getVendors().subscribe((value) => {
            this.vendorsList = value.result.items;
        });
    }

    getAllServices() {
        this.selectService.getServices().subscribe((value) => {
            this.servicesList = value.result.items;
        });
    }

    getAllYatchs() {
        this.yatchDetailsService.getAllYatchs().subscribe((value) => {
            this.yachtesList = value.result.items;
        });
    }

    createServiceOrder() {
        const model = {
            ...this.form.value,
            lightboxImages: this.lightboxImages.map((image) => {
                return { name: image.name, imageData: image.path.split(',')[1] };
            }),
        };

        this.service
            .addEditServiceOrders(model)
            .pipe(finalize(() => console.log('success')))
            .subscribe(
                (value) => {
                    this.reset();
                },
                (error) => {}
            );
    }

    reset() {
        this.form.reset();
    }
}
