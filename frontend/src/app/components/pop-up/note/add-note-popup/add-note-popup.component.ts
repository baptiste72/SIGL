import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoteService } from 'src/app/services/note/note.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SemesterService } from 'src/app/services/semester/semester.service';
import { Semester } from '@app/models/Semester';
import { ApprenticeService } from '@app/services/apprentice/apprentice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-note-popup',
  templateUrl: './add-note-popup.component.html',
  styleUrls: ['./add-note-popup.component.scss'],
})
export class AddNotePopupComponent implements OnInit {
  public semesters: Semester[] = [];
  public userId: number;
  public addNoteForm: FormGroup;
  public submitted: boolean = false;

  constructor(
    private noteService: NoteService,
    public dialogRef: MatDialogRef<AddNotePopupComponent>,
    private _snackBar: MatSnackBar,
    private semesterService: SemesterService,
    private apprenticeService: ApprenticeService,
    private formBuilder: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userId = data.userId;
    this.addNoteForm = this.formBuilder.group({
      title: ['', Validators.required],
      semester: ['', Validators.required],
      beginDate: ['', Validators.required],
      endDate: ['', Validators.required],
      text: ['', Validators.required],
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

  public submitNote() {
    this.submitted = true;
    if (this.addNoteForm.valid) {
      this.noteService.add(this.addNoteForm.value).subscribe({
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
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close' });
  }
}
