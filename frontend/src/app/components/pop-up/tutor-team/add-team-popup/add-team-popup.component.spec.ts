import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeamPopupComponent } from './add-team-popup.component';

describe('AddTeamPopupComponent', () => {
  let component: AddTeamPopupComponent;
  let fixture: ComponentFixture<AddTeamPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTeamPopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTeamPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
