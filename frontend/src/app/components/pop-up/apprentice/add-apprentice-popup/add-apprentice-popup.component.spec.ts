import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApprenticePopupComponent } from './add-apprentice-popup.component';

describe('AddApprenticePopupComponent', () => {
  let component: AddApprenticePopupComponent;
  let fixture: ComponentFixture<AddApprenticePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddApprenticePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddApprenticePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
