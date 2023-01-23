import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Semester } from '@app/models/Semester';
import { SemesterService } from '@app/services/semester/semester.service';
import { ApprenticeService } from '@app/services/apprentice/apprentice.service';
import { InterviewService } from '@app/services/interview/interview.service';
import { TutorTeamService } from '@app/services/tutor-team/tutor-team.service';
import { UserService } from '@app/services/user/user.service';
import * as moment from 'moment';
import { NgForm, FormControl, Validators } from '@angular/forms';

interface Attendees {
  name: string;
}

@Component({
  selector: 'app-add-interview-popup',
  templateUrl: './add-interview-popup.component.html',
  styleUrls: ['./add-interview-popup.component.scss'],
})
export class AddInterviewPopupComponent implements OnInit {
  interview: any;
  tutorTeam: any;
  public semesters: Semester[] = [];
  guests: Attendees[] = [
    { name: 'Equipe tutorale' },
    { name: "Maitre d'apprentissage" },
    { name: 'tuteur pédagogique' },
  ];

  constructor(
    public dialogRef: MatDialogRef<AddInterviewPopupComponent>,
    private interviewService: InterviewService,
    private tutorTeamService: TutorTeamService,
    private apprenticeService: ApprenticeService,
    private userService: UserService,
    private semesterService: SemesterService,
    private _snackBar: MatSnackBar,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.interview = {
      apprentice: data.userId,
      name: '',
      date: this.data.date,
      first_hour: moment().format('HH:mm'),
      last_hour: moment().add(2, 'hours').format('HH:mm'),
      description: '',
      semester: ' ',
      attendees: '',
    };
  }

  firstHourControl = new FormControl('', [
    Validators.pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
  ]);

  ngOnInit(): void {
    this.tutorTeamService.getByApprentice(this.data.userId).subscribe({
      next: (tutorTeam) => {
        this.tutorTeam = tutorTeam;
        this.userService.getById(this.tutorTeam.tutor).subscribe((tutor) => {
          this.tutorTeam.tutor = tutor;
        });
        this.userService.getById(this.tutorTeam.mentor).subscribe((mentor) => {
          this.tutorTeam.mentor = mentor;
        });
      },
      error: (err) => {
        console.log(err);
        this.errorTutor();
      },
    });
    this.apprenticeService.getById(this.data.userId).subscribe((apprentice) => {
      this.semesterService
        .getAllByYearGroup(apprentice.yearGroup.id)
        .subscribe((semesters) => {
          this.semesters = semesters;
        });
    });
  }

  submitForm(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.addinterview(form);
  }
  public addinterview(data: any) {
    if (data.attendees == 'Equipe tutorale') {
      data.attendees = [this.tutorTeam.mentor.id, this.tutorTeam.tutor.id];
    }
    if (data.attendees == "Maitre d'apprentissage") {
      data.attendees = [this.tutorTeam.mentor.id];
    }
    if (data.attendees == 'tuteur pédagogique') {
      data.attendees = [this.tutorTeam.tutor.id];
    }
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

  public errorTutor() {
    this._snackBar.open(
      "❌ Une erreur est survenue pas d'équipe pédagogique",
      'Ok',
      {
        duration: 2000,
      }
    );
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close' });
  }
}
