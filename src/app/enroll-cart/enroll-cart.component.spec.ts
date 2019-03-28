import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollCartComponent } from './enroll-cart.component';

describe('EnrollCartComponent', () => {
  let component: EnrollCartComponent;
  let fixture: ComponentFixture<EnrollCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrollCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
