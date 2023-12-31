import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtppageComponent } from './otppage.component';

describe('OtppageComponent', () => {
  let component: OtppageComponent;
  let fixture: ComponentFixture<OtppageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtppageComponent]
    });
    fixture = TestBed.createComponent(OtppageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
