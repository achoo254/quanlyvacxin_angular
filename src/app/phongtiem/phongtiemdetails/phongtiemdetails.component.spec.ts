import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PhongtiemdetailsComponent } from './phongtiemdetails.component';

describe('PhongtiemdetailsComponent', () => {
  let component: PhongtiemdetailsComponent;
  let fixture: ComponentFixture<PhongtiemdetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PhongtiemdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhongtiemdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
