import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TaikhoandetailsComponent } from './taikhoandetails.component';

describe('TaikhoandetailsComponent', () => {
  let component: TaikhoandetailsComponent;
  let fixture: ComponentFixture<TaikhoandetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TaikhoandetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaikhoandetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
