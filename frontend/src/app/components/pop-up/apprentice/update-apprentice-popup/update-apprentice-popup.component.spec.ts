import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateApprenticePopupComponent } from './update-apprentice-popup.component';

describe('UpdateApprenticePopupComponent', () => {
  let component: UpdateApprenticePopupComponent;
  let fixture: ComponentFixture<UpdateApprenticePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateApprenticePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateApprenticePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
