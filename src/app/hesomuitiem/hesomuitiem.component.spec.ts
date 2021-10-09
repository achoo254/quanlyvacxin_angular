/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HesomuitiemComponent } from './hesomuitiem.component';

describe('HesomuitiemComponent', () => {
  let component: HesomuitiemComponent;
  let fixture: ComponentFixture<HesomuitiemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HesomuitiemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HesomuitiemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
