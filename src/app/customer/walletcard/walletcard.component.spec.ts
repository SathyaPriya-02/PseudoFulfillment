import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletcardComponent } from './walletcard.component';

describe('WalletcardComponent', () => {
  let component: WalletcardComponent;
  let fixture: ComponentFixture<WalletcardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WalletcardComponent]
    });
    fixture = TestBed.createComponent(WalletcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
