import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyuseraccountComponent } from './myuseraccount.component';

describe('MyuseraccountComponent', () => {
  let component: MyuseraccountComponent;
  let fixture: ComponentFixture<MyuseraccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyuseraccountComponent]
    });
    fixture = TestBed.createComponent(MyuseraccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
