import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoteService } from 'src/app/services/note/note.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApprenticeService } from '@app/services/apprentice/apprentice.service';
import { SemesterService } from '@app/services/semester/semester.service';
import { Semester } from '@app/models/Semester';
import { Note } from '@app/models/Note';

@Component({
  selector: 'app-add-note-popup',
  templateUrl: './update-note-popup.component.html',
  styleUrls: ['./update-note-popup.component.scss'],
})
export class UpdateNotePopupComponent implements OnInit {
  jsonNote: any;
  fromPage!: string;
  fromDialog!: string;
  public userId: number;
  public noteForm: FormGroup;
  public semesters: Semester[] = [];
  public note: Note;

  constructor(
    private noteService: NoteService,
    public dialogRef: MatDialogRef<UpdateNotePopupComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    private semesterService: SemesterService,
    private apprenticeService: ApprenticeService,
    private formBuilder: FormBuilder
  ) {
    this.userId = data.userId;
    this.note = data.note;
    this.noteForm = this.formBuilder.group({
      title: [this.note.title, Validators.required],
      semester: [this.note.semester, Validators.required],
      beginDate: [this.note.beginDate, Validators.required],
      endDate: [this.note.endDate, Validators.required],
      text: [this.note.text, Validators.required],
      apprentice: [this.userId],
    });
  }

  ngOnInit(): void {
    this.apprenticeService.getById(this.userId).subscribe((apprentice) => {
      this.semesterService
        .getAllByYearGroup(apprentice.yearGroup.id)
        .subscribe((semesters) => {
          this.semesters = semesters;
        });
    });
  }

  public updateNote(data: any) {
    this.noteService.update(data, data.id).subscribe({
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

  public submitNote() {
    this.noteService.update(this.noteForm.value, this.note.id).subscribe({
      next: (v) => {
        this._snackBar.open('✔ Note modifiée', 'Ok', { duration: 2000 });
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
    this.dialogRef.close({ event: 'close', data: this.fromDialog });
  }
}
