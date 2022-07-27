import { Component, OnInit } from '@angular/core';
import { AddVendorComponent } from '../add-vendor/add-vendor.component';
import { RequestServiceService } from './request-service.service';
import { ModalService } from '@app/shared/common/modal/modal.service';
import { SearchItem } from '@app/shared/common/search-box/search-item';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VendorService } from '../add-vendor/vendor.service';
import { SelectServiceService } from '../select-service/select-service.service';
import { YachtDetailsService } from '../yacht-details/yacht-details.service';
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

    preYachtList: any = [];
    preServiceList: any = [];
    preVendorsList: any = [];

    vendorList: Array<SearchItem>;
    serviceList: Array<SearchItem>;
    yachtList: Array<SearchItem>;

    constructor(
        public service: RequestServiceService,
        private fb: FormBuilder,
        private modalService: ModalService,
        private vendorService: VendorService,
        public selectService: SelectServiceService,
        public yachtDetailsService: YachtDetailsService
    ) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            id: [0],
            yacht: [null, Validators.required],
            service: [null, Validators.required],
            vendor: [null, Validators.required],
            priority: [null, Validators.required],
            description: ['', Validators.required],
            // expectedDeliveryDate: [null],
            location: [null],
            // isActive: true,
            // status: [''],
            affectShipShape: true,
            taskList: [null],
            instruction: ['', Validators.required],
            bid_requested: false,
        });

        this.vendorList = [];
        this.yachtList = [];
        this.serviceList = [];

        this.getAllVendors();
        this.getAllServices();
        this.getAllYachts();
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
        this.setValue('vendor', item);
    }

    addNewVendor(item: string) {
        sessionStorage.setItem('vendor_new_item', item);
        this.openAddVendorModal();
    }

    getSelectedService(item: SearchItem) {
        this.setValue('service', item);
    }

    addNewService(item: string) {
        sessionStorage.setItem('service_new_item', item);
    }

    getSelectedYacht(item: SearchItem) {
        this.setValue('yatch', item);
    }

    addNewYacht(item: string) {
        sessionStorage.setItem('yacht_new_item', item);
    }

    setValue(control: string, value: any) {
        this.form.controls[control].setValue(value);
    }

    getAllVendors() {
        this.vendorService.getVendors().subscribe((value) => {
            this.preVendorsList = value.result.items;
            this.preVendorsList.forEach((vendor: { vendor: { id: string; firstName: string; lastName: string } }) => {
                this.vendorList.push({
                    id: vendor.vendor.id,
                    value: vendor.vendor.firstName + ' ' + vendor.vendor.lastName,
                });
            });
        });
    }

    getAllServices() {
        this.selectService.getServices().subscribe((value) => {
            this.preServiceList = value.result.items;
            this.preServiceList.forEach((service: { service: { id: string; name: string } }) => {
                this.serviceList.push({ id: service.service.id, value: service.service.name });
            });
        });
    }

    getAllYachts() {
        this.yachtDetailsService.getAllYachts().subscribe((value) => {
            this.preYachtList = value.result.items;
            this.preYachtList.forEach((yacht: { yatch: { id: string; name: string } }) => {
                this.yachtList.push({ id: yacht.yatch.id, value: yacht.yatch.name });
            });
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
