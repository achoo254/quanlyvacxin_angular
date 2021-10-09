import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PhongkhamComponent } from './phongkham.component';

describe('PhongkhamComponent', () => {
  let component: PhongkhamComponent;
  let fixture: ComponentFixture<PhongkhamComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PhongkhamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhongkhamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
