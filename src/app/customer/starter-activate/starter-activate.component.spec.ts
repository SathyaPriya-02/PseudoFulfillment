import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarterActivateComponent } from './starter-activate.component';

describe('StarterActivateComponent', () => {
  let component: StarterActivateComponent;
  let fixture: ComponentFixture<StarterActivateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StarterActivateComponent]
    });
    fixture = TestBed.createComponent(StarterActivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
