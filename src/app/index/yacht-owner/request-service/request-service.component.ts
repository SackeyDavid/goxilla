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
import { AddServiceComponent } from '../add-service/add-service.component';
import { AddYachtComponent } from '../add-yacht/add-yacht.component';
import { ServiceOrderService } from '../service-order/service-order.service';
import { AppService } from '../../../services/app.service';

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
        public yachtDetailsService: YachtDetailsService,
        private serviceOrderService: ServiceOrderService,
        public AppService: AppService
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            YachtId: [null, Validators.required],
            ServiceId: [null, Validators.required],
            VendorId: [null],
            Priority: [null, Validators.required],
            Description: ['', Validators.required],
            Status: [0],
            Name: ['Hermann'],
            Location: [null],
            AffectShipShape: true,
            Title: [''],
            Instruction: ['', Validators.required],
            // bid_requested: false,
        });

        this.vendorList = [];
        this.yachtList = [];
        this.serviceList = [];

        this.getAllVendors();
        this.getAllServices();
        this.getAllYachts();
        // this.getAllServiceOrders();
    }

    showNext(): void {
        this.showStepOne = !this.showStepOne;
        this.showStepTwo = !this.showStepTwo;
    }

    addPhoto(event: any) {
        if (event.target.files && event.target.files[0]) {
            for (const image of event.target.files) {
                this.lightboxImages.push(image);
                // console.log(this.lightboxImages);

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
        sessionStorage.setItem('userId', JSON.parse(localStorage.getItem('user_info')).result.user.id);
        this.modalService.createModal<AddVendorComponent>({
            content: AddVendorComponent,
        });
    }

    openAddServicesModal() {
        this.modalService.createModal<AddServiceComponent>({
            content: AddServiceComponent,
        });
    }

    openAddYatchModal() {
        this.modalService.createModal<AddYachtComponent>({
            content: AddYachtComponent,
        });
    }

    getSelectedVendor(item: SearchItem) {
        this.setValue('VendorId', item.id);
    }

    addNewVendor(item: SearchItem) {
        sessionStorage.setItem('vendor_new_item', item.value);
        this.vendorList.push(item);
        this.openAddVendorModal();
    }

    editNewVendor(item: string) {
        sessionStorage.setItem('vendor_edit_item', item);
        this.openAddVendorModal();
    }

    getSelectedService(item: SearchItem) {
        this.setValue('ServiceId', item.id);
    }

    addNewService(item: SearchItem) {
        sessionStorage.setItem('service_new_item', item.value);
        this.serviceList.push(item);
        this.openAddServicesModal();
    }

    getSelectedYacht(item: SearchItem) {
        this.setValue('YachtId', item.id);
    }

    editSelectedYacht(item: SearchItem) {
        let editItem = this.preYachtList.find((x) => x.yacht.id === item.id);

        sessionStorage.setItem('yacht_edit_item', JSON.stringify(editItem.yacht));
        this.openAddYatchModal();
    }

    addNewYacht(item: SearchItem) {
        sessionStorage.setItem('yacht_new_item', item.value);
        this.yachtList.push(item);
        this.openAddYatchModal();
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
            this.preYachtList.forEach((yacht: { yacht: { id: number; name: string } }) => {
                this.yachtList.push({ id: yacht.yacht.id, value: yacht.yacht.name });
            });
        });
    }

    getAllServiceOrders() {
        this.serviceOrderService.getAllServiceOrders().subscribe((value) => {
            // console.log(value.result.items);
        });
    }

    createServiceOrder() {
        this.showMainSpinner();
        let requestPayload = new FormData();

        Object.keys(this.form.controls).forEach((formControlName) => {
            // console.log('controls', this.form.get(formControlName)?.value);
            requestPayload.append(formControlName, this.form.get(formControlName)?.value);
        });

        this.lightboxImages.forEach((image: any) => {
            requestPayload.append(image.name, image);
        });

        /*  requestPayload.append('lightBoxImages', this.lightboxImages); */

        this.service
            .addEditServiceOrders(requestPayload)
            .pipe(finalize(() => console.log('success')))
            .subscribe(
                (result) => {
                    if (result.success === true) {
                        this.notify.success(this.l('Service Order Created Successfully'));
                        this.reset();
                        this.hideMainSpinner();
                        return;
                    }
                },
                (e) => {
                    this.hideMainSpinner();
                    this.notify.error(this.l(e.error.error.message));
                    return;
                }
            );
    }

    reset() {
        this.form.reset();
        this.lightboxImages = [];
        this.lightboxImagesAlt = [];
        this.showNext();
    }

    removeImage(data: any) {
        this.lightboxImagesAlt = this.lightboxImagesAlt.filter(function (image: { path: any }) {
            return image.path !== data.path;
        });
    }

    deleteYachtDetails(yachtId: number) {
        this.yachtDetailsService.removeYacht(yachtId).subscribe((value) => {
            // this.yatchDetails = value.result.yatch;
            console.log(value.result);
        });
    }
}
