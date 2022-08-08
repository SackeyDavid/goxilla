import { Component, inject, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseService } from '@app/shared/base.service';
import { ModalRef } from '@app/shared/common/modal/modal-ref';
import { finalize } from 'rxjs/operators';
import { EditServiceRequestService } from './edit-service-request.service';
import { SearchItem } from '@app/shared/common/search-box/search-item';
import { VendorService } from '../add-vendor/vendor.service';
import { AppService } from '@app/services/app.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SelectServiceService } from '../select-service/select-service.service';
import { YachtDetailsService } from '../yacht-details/yacht-details.service';
import { ServiceOrderService } from '../service-order/service-order.service';

@Component({
    selector: 'app-edit-service-request-modal',
    templateUrl: './edit-service-request-modal.component.html',
    styleUrls: ['./edit-service-request-modal.component.css'],
    providers: [ModalRef],
})
export class EditServiceRequestModalComponent extends AppComponentBase implements OnInit {
    form!: FormGroup;

    lightboxImages: any = [];
    lightboxImagesAlt: any = [];

    preYachtList: any = [];
    preServiceList: any = [];
    preVendorsList: any = [];

    vendorList: Array<SearchItem> = [];
    serviceList: Array<SearchItem> = [];
    yachtList: Array<SearchItem> = [];

    requestDetail: any;
    selectedYachtIndex: number = 0;
    selectedServiceIndex: number = 0;
    selectedVendorIndex: number = 0;
    serviceOrderId: any;

    constructor(
        injector: Injector,
        public modal: ModalRef,
        private fb: FormBuilder,
        public service: EditServiceRequestService,
        public baseService: BaseService,
        private vendorService: VendorService,
        public selectService: SelectServiceService,
        public yachtDetailsService: YachtDetailsService,
        private serviceOrderService: ServiceOrderService,
        public AppService: AppService
    ) {
        super(injector);
        modal.component = EditServiceRequestModalComponent;
    }

    ngOnInit() {
        this.form = this.fb.group({
            Id: [null, Validators.required],
            YachtId: [null, Validators.required],
            ServiceId: [null, Validators.required],
            VendorId: [null],
            Priority: [2, Validators.required],
            Description: ['', Validators.required],
            Status: [0],
            Name: ['David'],
            Location: [null],
            AffectShipShape: true,
            Title: [''],
            Instruction: [''],
        });

        this.serviceOrderId = this.AppService.getStorageItem('requestDetails').serviceOrder.id;

        this.getAllVendors();
        this.getAllServices();
        this.getAllYachts();

        if (this.AppService.getStorageItem('requestDetails')) {
            this.requestDetail = this.AppService.getStorageItem('requestDetails');

            this.editOrderItem(this.requestDetail.serviceOrder);
            this.setValue('VendorId', this.requestDetail.vendor?.id ? this.requestDetail.vendor.id : null);
            this.setValue('ServiceId', this.requestDetail.service.id);
            this.setValue('YachtId', this.requestDetail.yachts.id);

            this.requestDetail.lightboxImages.forEach((image) => {
                this.lightboxImagesAlt.push({ name: 'image' + new Date().getTime(), size: null, path: image.imageUrl });
            });
        }
    }

    close() {
        this.modal.closeModal();
    }

    reset() {
        this.form.reset();
        this.lightboxImages = [];
        this.lightboxImagesAlt = [];
    }

    assignEditVendor() {
        this.showMainSpinner();

        this.service
            .editServiceRequest(this.form.value)
            .pipe(
                finalize(() => {
                    this.hideMainSpinner();
                })
            )
            .subscribe(
                (value) => {
                    this.notify.success(this.l('Vendor assigned successfully'));
                    this.close();
                    window.location.reload();
                },
                (e) => {
                    console.log(e);
                    this.hideMainSpinner();
                    this.notify.error(this.l(e.error.error.message));
                }
            );
    }

    getSelectedVendorService(item: SearchItem) {
        this.setValue('vendorId', item.id);
        this.setValue('id', this.serviceOrderId);
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

            // returns -1 if vendor unassigned
            this.selectedVendorIndex = this.vendorList
                .map((object) => object.id)
                .indexOf(this.requestDetail?.vendor?.id);
        });
    }

    getAllServices() {
        this.selectService.getServices().subscribe((value) => {
            this.preServiceList = value.result.items;
            this.preServiceList.forEach((service: { service: { id: string; name: string } }) => {
                this.serviceList.push({ id: service.service.id, value: service.service.name });
            });

            this.selectedServiceIndex = this.serviceList
                .map((object) => object.id)
                .indexOf(this.requestDetail?.service.id);
        });
    }

    getAllYachts() {
        this.yachtDetailsService.getAllYachts().subscribe((value) => {
            this.preYachtList = value.result.items;
            this.preYachtList.forEach((yacht: { yacht: { id: number; name: string } }) => {
                this.yachtList.push({ id: yacht.yacht.id, value: yacht.yacht.name });
            });

            this.selectedYachtIndex = this.yachtList.map((object) => object.id).indexOf(this.requestDetail?.yachts.id);
        });
    }

    getSelectedVendor(item: SearchItem) {
        this.setValue('VendorId', item.id);
    }

    getSelectedService(item: SearchItem) {
        this.setValue('ServiceId', item.id);
    }

    getSelectedYacht(item: SearchItem) {
        this.setValue('YachtId', item.id);
    }

    removeImage(data: any) {
        this.lightboxImagesAlt = this.lightboxImagesAlt.filter(function (image: { path: any }) {
            return image.path !== data.path;
        });
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

    editOrderItem(order: any) {
        this.form.patchValue({
            Id: order.id,
            YachtId: order.yachtId,
            ServiceId: order.serviceId,
            VendorId: order.vendorId,
            Priority: order.priority,
            Description: order.description,
            Status: order.status,
            Name: order.name,
            Location: order.location,
            AffectShipShape: order.affectShipShape,
            Title: order.title,
            Instruction: order.instruction,
        });

        // console.log(this.form.value);
    }

    editServiceOrder() {
        this.showMainSpinner();
        console.log(this.form.value);
        console.log(this.findInvalidControls());

        let requestPayload = new FormData();

        Object.keys(this.form.controls).forEach((formControlName) => {
            if (formControlName == 'VendorId' && !this.form.get(formControlName)?.value) return;

            requestPayload.append(formControlName, this.form.get(formControlName)?.value);
        });

        this.lightboxImages.forEach((image: any) => {
            requestPayload.append(image.name, image);
        });

        console.log('Payload ', requestPayload);

        this.service
            .editServiceOrder(requestPayload)
            .pipe(finalize(() => console.log('success')))
            .subscribe(
                (result) => {
                    if (result.success === true) {
                        this.notify.success(this.l('Service Order Edited Successfully'));
                        this.reset();
                        window.location.reload();
                        this.hideMainSpinner();
                        this.close();

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

    public findInvalidControls() {
        const invalid = [];
        const controls = this.form.controls;
        for (const name in controls) {
            if (controls[name].invalid) {
                invalid.push(name);
            }
        }
        return invalid;
    }
}
