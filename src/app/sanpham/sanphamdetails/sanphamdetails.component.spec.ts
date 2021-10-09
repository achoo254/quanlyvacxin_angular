import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SanphamdetailsComponent } from './sanphamdetails.component';

describe('SanphamdetailsComponent', () => {
  let component: SanphamdetailsComponent;
  let fixture: ComponentFixture<SanphamdetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SanphamdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SanphamdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
