import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddYearGroupPopupComponent } from './add-year-group-popup.component';

describe('AddPromotionPopupComponent', () => {
  let component: AddYearGroupPopupComponent;
  let fixture: ComponentFixture<AddYearGroupPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddYearGroupPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddYearGroupPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
