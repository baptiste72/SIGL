import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPromotionPopupComponent } from './add-promotion-popup.component';

describe('AddPromotionPopupComponent', () => {
  let component: AddPromotionPopupComponent;
  let fixture: ComponentFixture<AddPromotionPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPromotionPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPromotionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
