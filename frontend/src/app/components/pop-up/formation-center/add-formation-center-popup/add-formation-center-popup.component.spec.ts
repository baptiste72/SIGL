import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFormationCenterPopupComponent } from './add-formation-center-popup.component';

describe('AddFormationCenterPopupComponent', () => {
  let component: AddFormationCenterPopupComponent;
  let fixture: ComponentFixture<AddFormationCenterPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFormationCenterPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFormationCenterPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
