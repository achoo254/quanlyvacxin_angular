import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DangkykhamComponent } from './dangkykham.component';

describe('DangkykhamComponent', () => {
  let component: DangkykhamComponent;
  let fixture: ComponentFixture<DangkykhamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DangkykhamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DangkykhamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
