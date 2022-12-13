import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInterviewPopupComponent } from './update-interview-popup.component';

describe('ModifyInterviewPopupComponent', () => {
  let component: UpdateInterviewPopupComponent;
  let fixture: ComponentFixture<UpdateInterviewPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateInterviewPopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateInterviewPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
