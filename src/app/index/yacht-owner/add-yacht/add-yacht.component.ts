import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseService } from '@app/shared/base.service';
import { ModalRef } from '@app/shared/common/modal/modal-ref';
import { finalize } from 'rxjs/operators';
import { YachtDetailsService } from '../yacht-details/yacht-details.service';

@Component({
    selector: 'app-add-yacht',
    templateUrl: './add-yacht.component.html',
    styleUrls: ['./add-yacht.component.css'],
    providers: [ModalRef],
})
export class AddYachtComponent implements OnInit {
    form!: FormGroup;
    editState: boolean = false;
    lightboxImages: any = [];
    lightboxImagesAlt: any = [];

    constructor(
        public modal: ModalRef,
        private fb: FormBuilder,
        public service: YachtDetailsService,
        public baseService: BaseService
    ) {
        modal.component = AddYachtComponent;
    }

    ngOnInit() {
        this.form = this.fb.group({
            id: [0],
            name: [null, Validators.required],
            hailingPort: [null, Validators.required],
            isActive: true,
            country: [null, Validators.required],
            userId: [0, Validators.required],
        });

        if (sessionStorage.getItem('yacht_new_item'))
            this.form.controls['name'].setValue(sessionStorage.getItem('yacht_new_item'));
    }

    close() {
        this.modal.closeModal();
    }

    reset() {
        this.form.reset();
        this.editState = false;
    }

    addEditVendor() {
        this.service
            .addEditYacht(this.form.value)
            .pipe(finalize(() => console.log('yachts add/edit success')))
            .subscribe(
                (value) => {
                    this.reset();
                    console.log(value);
                    this.close();
                },
                (error) => {
                    console.log(error);
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
