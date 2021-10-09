import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PhacdoComponent } from './phacdo.component';

describe('PhacdoComponent', () => {
  let component: PhacdoComponent;
  let fixture: ComponentFixture<PhacdoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PhacdoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhacdoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
