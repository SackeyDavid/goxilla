import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlurBackgroundModalComponent } from './blur-background-modal.component';

describe('BlurBackgroundModalComponent', () => {
  let component: BlurBackgroundModalComponent;
  let fixture: ComponentFixture<BlurBackgroundModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlurBackgroundModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlurBackgroundModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
