import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyNotePopupComponent } from './modify-note-popup.component';

describe('ModifyNotePopupComponent', () => {
  let component: ModifyNotePopupComponent;
  let fixture: ComponentFixture<ModifyNotePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyNotePopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModifyNotePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
