import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentSessionComponent } from './current-session.component';

describe('CurrentSessionComponent', () => {
  let component: CurrentSessionComponent;
  let fixture: ComponentFixture<CurrentSessionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrentSessionComponent]
    });
    fixture = TestBed.createComponent(CurrentSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
