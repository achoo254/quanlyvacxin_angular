import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GioithieuComponent } from './gioithieu.component';

describe('GioithieuComponent', () => {
  let component: GioithieuComponent;
  let fixture: ComponentFixture<GioithieuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GioithieuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GioithieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
