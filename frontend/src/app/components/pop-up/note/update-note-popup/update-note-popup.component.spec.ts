import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNotePopupComponent } from './update-note-popup.component';

describe('ModifyNotePopupComponent', () => {
  let component: UpdateNotePopupComponent;
  let fixture: ComponentFixture<UpdateNotePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateNotePopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateNotePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
