import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargeplanComponent } from './rechargeplan.component';

describe('RechargeplanComponent', () => {
  let component: RechargeplanComponent;
  let fixture: ComponentFixture<RechargeplanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RechargeplanComponent]
    });
    fixture = TestBed.createComponent(RechargeplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
