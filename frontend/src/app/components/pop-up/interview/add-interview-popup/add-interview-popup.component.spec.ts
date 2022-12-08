import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInterviewPopupComponent } from './add-interview-popup.component';

describe('AddInterviewPopupComponent', () => {
  let component: AddInterviewPopupComponent;
  let fixture: ComponentFixture<AddInterviewPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddInterviewPopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddInterviewPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
