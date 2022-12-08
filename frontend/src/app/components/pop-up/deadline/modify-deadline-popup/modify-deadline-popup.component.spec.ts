import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyDeadlinePopupComponent } from './modify-deadline-popup.component';

describe('ModifyDeadlinePopupComponent', () => {
  let component: ModifyDeadlinePopupComponent;
  let fixture: ComponentFixture<ModifyDeadlinePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyDeadlinePopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModifyDeadlinePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
