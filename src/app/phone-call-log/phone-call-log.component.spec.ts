import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneCallLogComponent } from './phone-call-log.component';

describe('PhoneCallLogComponent', () => {
  let component: PhoneCallLogComponent;
  let fixture: ComponentFixture<PhoneCallLogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhoneCallLogComponent]
    });
    fixture = TestBed.createComponent(PhoneCallLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
