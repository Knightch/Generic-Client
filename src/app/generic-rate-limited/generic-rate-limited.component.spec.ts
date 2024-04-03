import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericRateLimitedComponent } from './generic-rate-limited.component';

describe('GenericRateLimitedComponent', () => {
  let component: GenericRateLimitedComponent;
  let fixture: ComponentFixture<GenericRateLimitedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenericRateLimitedComponent]
    });
    fixture = TestBed.createComponent(GenericRateLimitedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
