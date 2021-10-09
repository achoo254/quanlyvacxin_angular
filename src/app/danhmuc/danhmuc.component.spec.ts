import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DanhmucComponent } from './danhmuc.component';

describe('DanhmucComponent', () => {
  let component: DanhmucComponent;
  let fixture: ComponentFixture<DanhmucComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmucComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
