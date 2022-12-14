import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDeadlinePopupComponent } from './update-deadline-popup.component';

describe('ModifyDeadlinePopupComponent', () => {
  let component: UpdateDeadlinePopupComponent;
  let fixture: ComponentFixture<UpdateDeadlinePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateDeadlinePopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateDeadlinePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
