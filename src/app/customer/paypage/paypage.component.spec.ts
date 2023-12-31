import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaypageComponent } from './paypage.component';

describe('PaypageComponent', () => {
  let component: PaypageComponent;
  let fixture: ComponentFixture<PaypageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaypageComponent]
    });
    fixture = TestBed.createComponent(PaypageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
