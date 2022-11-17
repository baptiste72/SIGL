import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSemesterPopupComponent } from './update-semester-popup.component';

describe('UpdateSemesterPopupComponent', () => {
  let component: UpdateSemesterPopupComponent;
  let fixture: ComponentFixture<UpdateSemesterPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSemesterPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSemesterPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
