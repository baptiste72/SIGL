import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEvaluationPopupComponent } from './update-evaluation-popup.component';

describe('UpdateEvaluationPopupComponent', () => {
  let component: UpdateEvaluationPopupComponent;
  let fixture: ComponentFixture<UpdateEvaluationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateEvaluationPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateEvaluationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
