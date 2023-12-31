import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserSuccessMessageComponent } from './new-user-success-message.component';

describe('NewUserSuccessMessageComponent', () => {
  let component: NewUserSuccessMessageComponent;
  let fixture: ComponentFixture<NewUserSuccessMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewUserSuccessMessageComponent]
    });
    fixture = TestBed.createComponent(NewUserSuccessMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
