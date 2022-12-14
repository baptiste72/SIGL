import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoteService } from 'src/app/services/note/note.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SemesterService } from 'src/app/services/semester/semester.service';

@Component({
  selector: 'app-add-note-popup',
  templateUrl: './add-note-popup.component.html',
  styleUrls: ['./add-note-popup.component.scss'],
})
export class AddNotePopupComponent implements OnInit {
  jsonNote: any;

  fromPage!: string;
  fromDialog!: string;

  public semesters: Semester[] = [];
  public userId: number;

  constructor(
    private authService: AuthService,
    private noteService: NoteService,
    public dialogRef: MatDialogRef<AddNotePopupComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    private semesterService: SemesterService
  ) {
    this.userId = data.userId;
  }

  ngOnInit(): void {
    this.semester = this.semesterService.getAllByYearGroup();
    this.jsonNote = {
      userId: this.userId,
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

  public addNote(note: any) {
    this.noteService.add(note).subscribe({
      next: (v) => {
        this._snackBar.open('✔ Note créé', 'Ok', { duration: 2000 });
        this.closeDialog();
      },
      error: (err) => {
        this._snackBar.open('❌ Une erreur est survenue', 'Ok', {
          duration: 2000,
        });
      },
    });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close' });
  }
}
