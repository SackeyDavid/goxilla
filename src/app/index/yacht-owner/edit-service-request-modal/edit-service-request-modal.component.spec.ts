import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditServiceRequestModalComponent } from './edit-service-request-modal.component';

describe('EditServiceRequestModalComponent', () => {
  let component: EditServiceRequestModalComponent;
  let fixture: ComponentFixture<EditServiceRequestModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditServiceRequestModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditServiceRequestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
