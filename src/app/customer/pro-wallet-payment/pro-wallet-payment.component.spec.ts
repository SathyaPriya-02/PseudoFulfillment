import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProWalletPaymentComponent } from './pro-wallet-payment.component';

describe('ProWalletPaymentComponent', () => {
  let component: ProWalletPaymentComponent;
  let fixture: ComponentFixture<ProWalletPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProWalletPaymentComponent]
    });
    fixture = TestBed.createComponent(ProWalletPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
