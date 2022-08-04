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
            Instruction: ['', Validators.required],
        });

        this.serviceOrderId = this.AppService.getStorageItem('requestDetails').serviceOrder.id;

        this.getAllVendors();
        this.getAllServices();
        this.getAllYachts();

        if (sessionStorage.getItem('order_edit_item')) {
            this.editOrderItem(JSON.parse(sessionStorage.getItem('order_edit_item')));
        }
    }

    close() {
        this.modal.closeModal();
    }

    reset() {
        this.form.reset();
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
            YachtId: order.YachtId,
            ServiceId: order.ServiceId,
            VendorId: order.VendorId,
            Priority: order.Priority,
            Description: order.Description,
            Status: order.Status,
            Name: order.Name,
            Location: order.Location,
            AffectShipShape: order.AffectShipShape,
            Title: order.Title,
            Instruction: order.Instruction,
        });

        sessionStorage.removeItem('order_edit_item');
    }
}
