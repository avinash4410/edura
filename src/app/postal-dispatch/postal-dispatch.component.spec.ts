import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostalDispatchComponent } from './postal-dispatch.component';

describe('PostalDispatchComponent', () => {
  let component: PostalDispatchComponent;
  let fixture: ComponentFixture<PostalDispatchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostalDispatchComponent]
    });
    fixture = TestBed.createComponent(PostalDispatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
