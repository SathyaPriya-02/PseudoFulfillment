import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserhomepageComponent } from './userhomepage.component';

describe('UserhomepageComponent', () => {
  let component: UserhomepageComponent;
  let fixture: ComponentFixture<UserhomepageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserhomepageComponent]
    });
    fixture = TestBed.createComponent(UserhomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
