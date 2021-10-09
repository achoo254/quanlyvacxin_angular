import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TieptandetailsComponent } from './tieptandetails.component';

describe('TieptandetailsComponent', () => {
  let component: TieptandetailsComponent;
  let fixture: ComponentFixture<TieptandetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TieptandetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TieptandetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
