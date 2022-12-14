import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InterviewService } from '@app/services/interview/interview.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@app/services/auth/auth.service';
import { Semester } from '@app/models/Semester';
import { SemesterService } from '@app/services/semester/semester.service';
import { ApprenticeService } from '@app/services/apprentice/apprentice.service';

interface Attendees {
  name: string;
}

@Component({
  selector: 'app-add-event-popup',
  templateUrl: './add-interview-popup.component.html',
  styleUrls: ['./add-interview-popup.component.scss'],
})
export class AddInterviewPopupComponent implements OnInit {
  interview: any;
  public semesters: Semester[] = [];
  guests: Attendees[] = [
    { name: 'Equipe tutorale' },
    { name: "Maitre d'apprentissage" },
    { name: 'tuteur pédaogique' },
  ];

  constructor(
    public dialogRef: MatDialogRef<AddInterviewPopupComponent>,
    private interviewService: InterviewService,
    private apprenticeService: ApprenticeService,
    private semesterService: SemesterService,
    private _snackBar: MatSnackBar,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.interview = {
      userId: data.userId,
      name: '',
      date: '',
      first_hour: '',
      last_hour: '',
      description: '',
      semester: ' ',
    };
  }

  ngOnInit(): void {
    this.apprenticeService.getById(this.data.userId).subscribe((apprentice) => {
      this.semesterService
        .getAllByYearGroup(apprentice.yearGroup.id)
        .subscribe((semesters) => {
          this.semesters = semesters;
        });
    });
  }

  public addinterview(data: any) {
    this.interviewService.add(data).subscribe({
      next: (v) => {
        this._snackBar.open('✔ Evénement créé', 'Ok', { duration: 2000 });
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
