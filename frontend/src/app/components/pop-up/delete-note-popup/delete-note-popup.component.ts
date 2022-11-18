import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoteService } from 'src/app/services/note/note.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-delete-note-popup',
  templateUrl: './delete-note-popup.component.html',
  styleUrls: ['./delete-note-popup.component.scss'],
})
export class DeleteNotePopupComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeleteNotePopupComponent>,
    private _snackBar: MatSnackBar,
    private noteService: NoteService
  ) {}

  public deleteNote(id: any) {
    this.noteService.deleteNote(this.data.dataKey).subscribe({
      next: (v) => {
        this._snackBar.open('✔ Note supprimer', 'Ok', { duration: 2000 });
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
