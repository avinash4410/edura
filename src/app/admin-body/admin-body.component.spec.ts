import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBodyComponent } from './admin-body.component';

describe('AdminBodyComponent', () => {
  let component: AdminBodyComponent;
  let fixture: ComponentFixture<AdminBodyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminBodyComponent]
    });
    fixture = TestBed.createComponent(AdminBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
