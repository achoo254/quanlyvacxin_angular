import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PhongkhamdetailsComponent } from './phongkhamdetails.component';

describe('PhongkhamdetailsComponent', () => {
  let component: PhongkhamdetailsComponent;
  let fixture: ComponentFixture<PhongkhamdetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PhongkhamdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhongkhamdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
