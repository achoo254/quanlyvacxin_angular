import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ThongkeComponent } from './thongke.component';

describe('ThongkeComponent', () => {
  let component: ThongkeComponent;
  let fixture: ComponentFixture<ThongkeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongkeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongkeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
