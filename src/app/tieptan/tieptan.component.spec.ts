import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TieptanComponent } from './tieptan.component';

describe('TieptanComponent', () => {
  let component: TieptanComponent;
  let fixture: ComponentFixture<TieptanComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TieptanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TieptanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
