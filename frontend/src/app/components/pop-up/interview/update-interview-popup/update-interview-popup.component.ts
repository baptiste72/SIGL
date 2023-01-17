import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InterviewService } from '@app/services/interview/interview.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Interview } from '@app/models/Interview';

interface Semester {
  name: string;
}

interface Guest {
  name: string;
}

@Component({
  selector: 'app-update-interview-popup',
  templateUrl: './update-interview-popup.component.html',
  styleUrls: ['./update-interview-popup.component.scss'],
})
export class UpdateInterviewPopupComponent implements OnInit {
  interview: any;
  semesters: Semester[] = [
    { name: 'Semestre S5' },
    { name: 'Semestre S6' },
    { name: 'Semestre S7' },
    { name: 'Semestre S8' },
    { name: 'Semestre S9' },
  ];
  guests: Guest[] = [
    { name: 'Équipe tutorale' },
    { name: "Maitre d'apprentissage" },
    { name: 'Tuteur pédagogique' },
  ];

  constructor(
    public dialogRef: MatDialogRef<UpdateInterviewPopupComponent>,
    private interviewService: InterviewService,
    private _snackBar: MatSnackBar,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  fromDialog!: string;

  ngOnInit(): void {
    this.interview = this.data.interview;
  }

  public updateInterview(interview: Interview) {
    this.interviewService.update(interview, this.data.id).subscribe({
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
    this.dialogRef.close({ event: 'close', data: this.fromDialog });
  }
}
