import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEvaluationPopupComponent } from './add-evaluation-popup.component';

describe('AddEvaluationPopupComponent', () => {
  let component: AddEvaluationPopupComponent;
  let fixture: ComponentFixture<AddEvaluationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEvaluationPopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEvaluationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
