import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDeadlinePopupComponent } from './delete-deadline-popup.component';

describe('DeleteDeadlinePopupComponent', () => {
  let component: DeleteDeadlinePopupComponent;
  let fixture: ComponentFixture<DeleteDeadlinePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteDeadlinePopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteDeadlinePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
