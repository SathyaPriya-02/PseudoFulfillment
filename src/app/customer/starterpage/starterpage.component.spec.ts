import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarterpageComponent } from './starterpage.component';

describe('StarterpageComponent', () => {
  let component: StarterpageComponent;
  let fixture: ComponentFixture<StarterpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StarterpageComponent]
    });
    fixture = TestBed.createComponent(StarterpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
