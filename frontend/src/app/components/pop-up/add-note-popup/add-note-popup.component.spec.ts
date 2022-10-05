import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNotePopupComponent } from './add-note-popup.component';

describe('AddNotePopupComponent', () => {
  let component: AddNotePopupComponent;
  let fixture: ComponentFixture<AddNotePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNotePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNotePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
