import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteNotePopupComponent } from './delete-note-popup.component';

describe('DeleteNotePopupComponent', () => {
  let component: DeleteNotePopupComponent;
  let fixture: ComponentFixture<DeleteNotePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteNotePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteNotePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
