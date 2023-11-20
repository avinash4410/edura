import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonPlanComponent } from './lesson-plan.component';

describe('LessonPlanComponent', () => {
  let component: LessonPlanComponent;
  let fixture: ComponentFixture<LessonPlanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LessonPlanComponent]
    });
    fixture = TestBed.createComponent(LessonPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
