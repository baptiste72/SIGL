import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDeadlinePopupComponent } from './view-deadline-popup.component';

describe('ViewDeadlinePopupComponent', () => {
  let component: ViewDeadlinePopupComponent;
  let fixture: ComponentFixture<ViewDeadlinePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewDeadlinePopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewDeadlinePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
