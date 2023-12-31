import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannavbarComponent } from './plannavbar.component';

describe('PlannavbarComponent', () => {
  let component: PlannavbarComponent;
  let fixture: ComponentFixture<PlannavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlannavbarComponent]
    });
    fixture = TestBed.createComponent(PlannavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
