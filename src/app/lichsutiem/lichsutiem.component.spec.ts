import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LichsutiemComponent } from './lichsutiem.component';

describe('LichsutiemComponent', () => {
  let component: LichsutiemComponent;
  let fixture: ComponentFixture<LichsutiemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LichsutiemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LichsutiemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
