import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ThungandetailsComponent } from './thungandetails.component';

describe('ThungandetailsComponent', () => {
  let component: ThungandetailsComponent;
  let fixture: ComponentFixture<ThungandetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ThungandetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThungandetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
