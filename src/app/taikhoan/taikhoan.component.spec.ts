import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TaikhoanComponent } from './taikhoan.component';

describe('TaikhoanComponent', () => {
  let component: TaikhoanComponent;
  let fixture: ComponentFixture<TaikhoanComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TaikhoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaikhoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
