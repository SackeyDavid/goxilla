import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseService } from '@app/shared/base.service';
import { ModalRef } from '@app/shared/common/modal/modal-ref';
import { AppComponentBase } from '@shared/common/app-component-base';
import { finalize } from 'rxjs/operators';
import { YachtDetailsService } from '../yacht-details/yacht-details.service';

@Component({
    selector: 'app-add-yacht',
    templateUrl: './add-yacht.component.html',
    styleUrls: ['./add-yacht.component.css'],
    providers: [ModalRef],
})
export class AddYachtComponent extends AppComponentBase implements OnInit {
    form!: FormGroup;
    editState: boolean = false;
    lightboxImages: any = [];
    lightboxImagesAlt: any = [];

    constructor(
        injector: Injector,
        public modal: ModalRef,
        private fb: FormBuilder,
        public service: YachtDetailsService,
        public baseService: BaseService
    ) {
        super(injector);
        modal.component = AddYachtComponent;
    }

    ngOnInit() {
        this.form = this.fb.group({
            name: [null, Validators.required],
            hailingPort: [null, Validators.required],
            isActive: true,
            country: [null, Validators.required],
            userId: [this.getUID(), Validators.required],
        });

        if (sessionStorage.getItem('yacht_new_item')) {
            this.form.controls['name'].setValue(sessionStorage.getItem('yacht_new_item'));
        }
    }

    getUID() {
        return JSON.parse(localStorage.getItem('user_info')).result.user.id;
    }

    close() {
        this.modal.closeModal();
    }

    reset() {
        this.form.reset();
        this.lightboxImages = [];
        this.editState = false;
    }

    addEditVendor() {
        // let requestPayload = new FormData();

        // Object.keys(this.form.controls).forEach((formControlName) => {
        //     // console.log('controls', this.form.get(formControlName)?.value);
        //     requestPayload.append(formControlName, this.form.get(formControlName)?.value);
        // });

        // this.lightboxImages.forEach((image: any) => {
        //     requestPayload.append(image.name, image);
        // });

        const model = {
            ...this.form.value,
            lightboxImages: this.lightboxImagesAlt.map((image) => {
                return { name: image.name, image: image.path.split(',')[1] };
            }),
        };
        console.log(model);
        this.service
            .addEditYacht(model)
            .pipe(finalize(() => console.log('yachts add/edit success')))
            .subscribe(
                (result) => {
                    console.log(result);
                    if (result.success === true) {
                        this.notify.success(this.l('Service Order Created Successfully'));
                        this.reset();
                        this.close();
                        return;
                    }
                },
                (e) => {
                    this.notify.error(this.l(e.error?.error?.message));
                    return;
                }
            );
    }

    editItem(yacht: any) {
        this.form.patchValue({
            id: yacht.id,
            name: yacht.name,
            hailingPort: yacht.hailingPort,
            isActive: true,
            country: yacht.country,
            userId: yacht.userId,
        });

        this.editState = true;
    }

    addYachtPhoto(event: any) {
        if (event.target.files && event.target.files[0]) {
            for (const image of event.target.files) {
                this.lightboxImages.push(image);

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

    removeImage(data: any) {
        this.lightboxImagesAlt = this.lightboxImagesAlt.filter(function (image: { path: any }) {
            return image.path !== data.path;
        });
    }
}
