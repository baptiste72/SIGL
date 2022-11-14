import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {NoteService} from 'src/app/services/note/note.service'
import { MatSnackBar } from '@angular/material/snack-bar';

interface Semester {
  name: string;
}

@Component({
  selector: 'app-add-note-popup',
  templateUrl: './add-note-popup.component.html',
  styleUrls: ['./add-note-popup.component.scss']
})
export class AddNotePopupComponent implements OnInit {
  js_note: any;

  fromPage!: string;
  fromDialog!: string;
  constructor( private noteService: NoteService,   public dialogRef: MatDialogRef<AddNotePopupComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any,private _snackBar: MatSnackBar,
    ) { }

  ngOnInit(): void {
    this.js_note = {
      title : '',
      text :'',
      semester: '',
      dateStart : '',
      dateEnd : ''
    };
  }

  public addNote(data: any) {
    this.noteService.addnote(data).subscribe({
     next: (v) => {
       this._snackBar.open("✔ Evénement créé", "Ok", { duration: 2000});
       this.closeDialog();
     },
     error: (err) => {
       this._snackBar.open("❌ Une erreur est survenue", "Ok", { duration: 2000})
     }
   });
}
  closeDialog() { this.dialogRef.close({ event: 'close', data: this.fromDialog }); }

  semesters: Semester[] = [{name: 'Semestre S7'},{name: 'Semestre S8'},{name: 'Semestre S9'}];
}
