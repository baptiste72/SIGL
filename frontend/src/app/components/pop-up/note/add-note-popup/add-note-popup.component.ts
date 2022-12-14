import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoteService } from 'src/app/services/note/note.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth/auth.service';

interface Semester {
  name: string;
}

@Component({
  selector: 'app-add-note-popup',
  templateUrl: './add-note-popup.component.html',
  styleUrls: ['./add-note-popup.component.scss'],
})
export class AddNotePopupComponent implements OnInit {
  jsonNote: any;

  fromPage!: string;
  fromDialog!: string;
  constructor(
    private authService: AuthService,
    private noteService: NoteService,
    public dialogRef: MatDialogRef<AddNotePopupComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.jsonNote = {
      userId: this.getUserId(),
      title: '',
      text: '',
      semester: '',
      dateStart: '',
      dateEnd: '',
    };
  }

  private getUserId(): number {
    return this.authService.userValue.id;
  }

  public addNote(data: any) {
    this.noteService.add(data).subscribe({
      next: (v) => {
        this._snackBar.open('✔ Note créé', 'Ok', { duration: 2000 });
        this.closeDialogAdd(v);
      },
      error: (err) => {
        this._snackBar.open('❌ Une erreur est survenue', 'Ok', {
          duration: 2000,
        });
      },
    });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close', data: this.jsonNote });
  }

  closeDialogAdd(data: any) {
    this.dialogRef.close({ event: 'ajout', data: data });
  }

  semesters: Semester[] = [
    { name: 'Semestre S5' },
    { name: 'Semestre S6' },
    { name: 'Semestre S7' },
    { name: 'Semestre S8' },
    { name: 'Semestre S9' },
  ];
}
