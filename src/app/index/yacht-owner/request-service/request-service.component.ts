import { Component, Injector, OnInit } from '@angular/core';
import { AddVendorComponent } from '../add-vendor/add-vendor.component';
import { RequestServiceService } from './request-service.service';
import { ModalService } from '@app/shared/common/modal/modal.service';
import { SearchItem } from '@app/shared/common/search-box/search-item';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VendorService } from '../add-vendor/vendor.service';
import { SelectServiceService } from '../select-service/select-service.service';
import { YachtDetailsService } from '../yacht-details/yacht-details.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-request-service',
    templateUrl: './request-service.component.html',
    styleUrls: ['./request-service.component.css'],
})
export class RequestServiceComponent extends AppComponentBase implements OnInit {

    showStepOne: boolean = true;
    showStepTwo: boolean = false;
    lightboxImages: any = [];
    lightboxImagesAlt: any = [];
    form!: FormGroup;

    preYachtList: any = [];
    preServiceList: any = [];
    preVendorsList: any = [];

    vendorList: Array<SearchItem>;
    serviceList: Array<SearchItem>;
    yachtList: Array<SearchItem>;

    constructor(
        injector: Injector,
        public service: RequestServiceService,
        private fb: FormBuilder,
        private modalService: ModalService,
        private vendorService: VendorService,
        public selectService: SelectServiceService,
        public yachtDetailsService: YachtDetailsService
    ) {
        super(injector);
    }

    ngOnInit(): void {

        this.form = this.fb.group({
            id: [0],
            Yacht: [null, Validators.required],
            Service: [null, Validators.required],
            Vendor: [null, Validators.required],
            Priority: [null, Validators.required],
            Description: ['', Validators.required],
            /* expectedDeliveryDate: [null], */
            Location: [null],
            /* isActive: true,
            status: [''], */
            AffectShipShape: true,
            TaskList: [null],
            Instruction: ['', Validators.required],
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

    addPhoto(event: any) {
        if (event.target.files && event.target.files[0]) {
            for (const image of event.target.files) {

                this.lightboxImages.push(image);
                console.log(this.lightboxImages);

                const reader = new FileReader();
                reader.onload = (event: any) => {
                    this.lightboxImagesAlt.push({ name: image.name, size: image.size, path: event.target.result });
                    this.lightboxImagesAlt.reverse();
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
        this.setValue('Vendor', item.id);
    }

    addNewVendor(item: string) {
        sessionStorage.setItem('vendor_new_item', item);
        this.openAddVendorModal();
    }

    getSelectedService(item: SearchItem) {
        this.setValue('Service', item.id);
    }

    addNewService(item: string) {
        sessionStorage.setItem('service_new_item', item);
    }

    getSelectedYacht(item: SearchItem) {
        this.setValue('Yacht', item.id);
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

        this.showMainSpinner();
        let requestPayload = new FormData();

        Object.keys(this.form.controls).forEach(formControlName => {
            console.log('controls', this.form.get(formControlName)?.value);
            requestPayload.append(formControlName, this.form.get(formControlName)?.value);
        });

        this.lightboxImages.forEach((image: any) => {
            requestPayload.append(image.name, image);
        });

        /*  requestPayload.append('lightBoxImages', this.lightboxImages); */

        this.service.addEditServiceOrders(requestPayload).pipe(finalize(() => console.log('success'))).subscribe((result) => {

            if (result.success === true) {

                this.notify.success(this.l('Service Order Created Successfully'));
                this.reset();
                this.hideMainSpinner();
                return;

            }

        }, (e) => {

            this.hideMainSpinner();
            this.notify.error(this.l(e.error.error.message));
            return;

        });
    }

    reset() {
        this.form.reset();
        this.lightboxImages = [];
        this.lightboxImagesAlt = [];
        this.showNext();
    }

    removeImage(data: any) {
        this.lightboxImagesAlt = this.lightboxImagesAlt.filter(function (image: { path: any; }) {
            return image.path !== data.path;
        });
    }

}
