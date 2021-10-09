import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DangkytiemComponent } from './dangkytiem.component';

describe('DangkytiemComponent', () => {
  let component: DangkytiemComponent;
  let fixture: ComponentFixture<DangkytiemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DangkytiemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DangkytiemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
