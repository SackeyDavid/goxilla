/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MakeABidComponent } from './make-a-bid.component';

describe('MakeABidComponent', () => {
  let component: MakeABidComponent;
  let fixture: ComponentFixture<MakeABidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeABidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeABidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
