/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddYachtComponent } from './add-yacht.component';

describe('AddYachtComponent', () => {
    let component: AddYachtComponent;
    let fixture: ComponentFixture<AddYachtComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddYachtComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddYachtComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
