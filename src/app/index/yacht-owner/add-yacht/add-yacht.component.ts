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
    images = [
        'https://cdn.boatinternational.com/files/2022/08/7d043880-1247-11ed-b0de-c73b18ad144c-VICTORY%20LANE%20on%20the%20water.jpg',
        'https://cdn.boatinternational.com/files/2022/08/d2b5e0b0-11ae-11ed-ab11-af854a188e91-azimut%20KW%20for%20sale%20.jpg',
        'https://cdn.boatinternational.com/files/2021/05/7ead10f0-be04-11eb-a2d8-59862fec3502-Gayle-Force-3.jpg',
        'https://cdn.boatinternational.com/files/2022/03/0f9205d0-ac4d-11ec-aaba-83612fc75cd7-Moonshadow%20Moonen%20profile.jpg',
        'https://cdn.boatinternational.com/files/2022/07/4642e9a0-0f3f-11ed-a0a9-1f6569b781c2-benetti%20profile.jpg',
        'https://cdn.boatinternational.com/files/2022/07/b6169940-0f2e-11ed-9cab-31894ad1c269-BAD%20ROMANCE%20on%20the%20water.jpg',
    ];

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
            id: [null],
            name: [null, Validators.required],
            hailingPort: [null, Validators.required],
            imageUrl: [null],
            isActive: true,
            country: [null, Validators.required],
            userId: [this.getUID(), Validators.required],
        });

        if (sessionStorage.getItem('yacht_new_item')) {
            this.form.controls['name'].setValue(sessionStorage.getItem('yacht_new_item'));
        }

        if (sessionStorage.getItem('yacht_edit_item')) {
            this.editItem(JSON.parse(sessionStorage.getItem('yacht_edit_item')));
        }
    }

    getUID() {
        return sessionStorage.getItem('userId');
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
        const model = {
            ...this.form.value,
            imageUrl: !this.form.controls['imageUrl'].value
                ? this.images[this.getRandomInt(0, 5)]
                : this.form.controls['imageUrl'].value,
        };
        console.log(model);
        this.service
            .addEditYacht(model)
            .pipe(finalize(() => console.log('yachts add/edit success')))
            .subscribe(
                (result) => {
                    console.log(result);
                    if (result.success === true) {
                        this.notify.success(this.l('Yacht Saved Successfully'));
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
            imageUrl: yacht.imageUrl,
        });

        this.editState = true;
        sessionStorage.removeItem('yacht_edit_item');
    }

    addYachtPhoto(event: any) {
        if (event.target.files && event.target.files[0]) {
            for (const image of event.target.files) {
                this.lightboxImages.push(image);

                const reader = new FileReader();
                reader.onload = (event: any) => {
                    this.lightboxImagesAlt.push({ name: image.name, size: image.size, path: event.target.result });
                    this.lightboxImagesAlt.reverse();
                };

                reader.readAsDataURL(image);
            }
            event.target.value = '';
        }
    }

    removeImage(data: any) {
        this.lightboxImagesAlt = this.lightboxImagesAlt.filter(function (image: { path: any }) {
            return image.path !== data.path;
        });
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

    getRandomInt(min: any, max: any) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
