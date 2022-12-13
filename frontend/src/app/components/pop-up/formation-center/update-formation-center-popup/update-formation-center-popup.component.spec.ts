import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFormationCenterPopupComponent } from './update-formation-center-popup.component';

describe('UpdateFormationCenterPopupComponent', () => {
  let component: UpdateFormationCenterPopupComponent;
  let fixture: ComponentFixture<UpdateFormationCenterPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateFormationCenterPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateFormationCenterPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
