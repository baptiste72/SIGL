import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteInterviewPopupComponent } from './delete-interview-popup.component';

describe('DeleteInterviewPopupComponent', () => {
  let component: DeleteInterviewPopupComponent;
  let fixture: ComponentFixture<DeleteInterviewPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteInterviewPopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteInterviewPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
