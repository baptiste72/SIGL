import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

interface Semester {
  name: string;
}

@Component({
  selector: 'app-add-note-popup',
  templateUrl: './add-note-popup.component.html',
  styleUrls: ['./add-note-popup.component.scss'],
})
export class AddNotePopupComponent {
  semesters: Semester[] = [
    { name: 'Semestre S7' },
    { name: 'Semestre S8' },
    { name: 'Semestre S9' },
  ];

  constructor(public dialogRef: MatDialogRef<AddNotePopupComponent>
  ) {}

  closeDialog() {
    this.dialogRef.close({ event: 'close' });
  }
}
