import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeadlinePopupComponent } from './add-deadline-popup.component';

describe('AddDeadlinePopupComponent', () => {
  let component: AddDeadlinePopupComponent;
  let fixture: ComponentFixture<AddDeadlinePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddDeadlinePopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddDeadlinePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
