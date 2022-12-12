import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTeamPopupComponent } from './update-team-popup.component';

describe('UpdateTeamPopupComponent', () => {
  let component: UpdateTeamPopupComponent;
  let fixture: ComponentFixture<UpdateTeamPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTeamPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTeamPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
