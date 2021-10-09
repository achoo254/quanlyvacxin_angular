import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ThunganComponent } from './thungan.component';

describe('ThunganComponent', () => {
  let component: ThunganComponent;
  let fixture: ComponentFixture<ThunganComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ThunganComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThunganComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
