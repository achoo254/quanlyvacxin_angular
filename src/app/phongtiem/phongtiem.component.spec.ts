import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PhongtiemComponent } from './phongtiem.component';

describe('PhongtiemComponent', () => {
  let component: PhongtiemComponent;
  let fixture: ComponentFixture<PhongtiemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PhongtiemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhongtiemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
