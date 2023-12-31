import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargesucessComponent } from './rechargesucess.component';

describe('RechargesucessComponent', () => {
  let component: RechargesucessComponent;
  let fixture: ComponentFixture<RechargesucessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RechargesucessComponent]
    });
    fixture = TestBed.createComponent(RechargesucessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
