import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YachtOwnerComponent } from './yacht-owner.component';

describe('YachtOwnerComponent', () => {
  let component: YachtOwnerComponent;
  let fixture: ComponentFixture<YachtOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YachtOwnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YachtOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
