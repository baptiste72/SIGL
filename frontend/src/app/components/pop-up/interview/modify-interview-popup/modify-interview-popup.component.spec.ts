import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyInterviewPopupComponent } from './modify-interview-popup.component';

describe('ModifyInterviewPopupComponent', () => {
  let component: ModifyInterviewPopupComponent;
  let fixture: ComponentFixture<ModifyInterviewPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyInterviewPopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModifyInterviewPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
