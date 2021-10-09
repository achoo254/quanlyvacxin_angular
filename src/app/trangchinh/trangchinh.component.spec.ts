import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TrangchinhComponent } from './trangchinh.component';

describe('TrangchinhComponent', () => {
  let component: TrangchinhComponent;
  let fixture: ComponentFixture<TrangchinhComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TrangchinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrangchinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
