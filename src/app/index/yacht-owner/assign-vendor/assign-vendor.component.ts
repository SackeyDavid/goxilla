import { Component, inject, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseService } from '@app/shared/base.service';
import { ModalRef } from '@app/shared/common/modal/modal-ref';
import { finalize } from 'rxjs/operators';
import { AssignVendorService } from './assign-vendor.service';
import { SearchItem } from '@app/shared/common/search-box/search-item';
import { VendorService } from '../add-vendor/vendor.service';
import { AppService } from '@app/services/app.service';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'app-assign-vendor',
    templateUrl: './assign-vendor.component.html',
    styleUrls: ['./assign-vendor.component.css'],
    providers: [ModalRef]
})
export class AssignVendorComponent extends AppComponentBase implements OnInit {

    form!: FormGroup;

    preVendorsList: any = [];
    vendorList: Array<SearchItem> = [];
    serviceOrderId: any;

    constructor(
        injector: Injector,
        public modal: ModalRef,
        private fb: FormBuilder,
        public service: AssignVendorService,
        public baseService: BaseService,
        private vendorService: VendorService,
        public AppService: AppService
    ) {
        super(injector);
        modal.component = AssignVendorComponent;
    }

    ngOnInit() {

        this.form = this.fb.group({
            vendorId: [null, Validators.required],
            id: [null, Validators.required]
        });

        this.serviceOrderId = this.AppService.getStorageItem('requestDetails').serviceOrder.id;
        this.getAllVendors();

    }

    close() {
        this.modal.closeModal();
    }

    reset() {
        this.form.reset();
    }

    assignEditVendor() {

        this.showMainSpinner();

        this.service.assignVendor(this.form.value).pipe(finalize(() => {
            this.hideMainSpinner();
        })).subscribe((value) => {

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

}
