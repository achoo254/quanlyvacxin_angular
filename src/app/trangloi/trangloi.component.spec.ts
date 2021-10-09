import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrangloiComponent } from './trangloi.component';

describe('TrangloiComponent', () => {
  let component: TrangloiComponent;
  let fixture: ComponentFixture<TrangloiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrangloiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrangloiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
