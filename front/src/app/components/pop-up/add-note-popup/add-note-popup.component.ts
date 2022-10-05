import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface Semester {
  name: string;
}

@Component({
  selector: 'app-add-note-popup',
  templateUrl: './add-note-popup.component.html',
  styleUrls: ['./add-note-popup.component.scss']
})
export class AddNotePopupComponent implements OnInit {
  fromPage!: string;
  fromDialog!: string;

  constructor(    public dialogRef: MatDialogRef<AddNotePopupComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any
    ) { }

  ngOnInit(): void {
    this.fromDialog = "I am from dialog land...";
  }

  closeDialog() { this.dialogRef.close({ event: 'close', data: this.fromDialog }); }

  semesters: Semester[] = [{name: 'Semestre S7'},{name: 'Semestre S8'},{name: 'Semestre S9'}];
}
