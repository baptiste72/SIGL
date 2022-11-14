import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSemesterPopupComponent } from './add-semester-popup.component';

describe('AddSemesterPopupComponent', () => {
  let component: AddSemesterPopupComponent;
  let fixture: ComponentFixture<AddSemesterPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSemesterPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSemesterPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
