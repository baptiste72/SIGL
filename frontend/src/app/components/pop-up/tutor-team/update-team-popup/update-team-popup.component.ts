import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApprenticeService } from 'src/app/services/apprentice/apprentice.service';
import { MentorService } from 'src/app/services/mentor/mentor.service';
import { TutorService } from 'src/app/services/tutor/tutor.service';
import { Mentor } from 'src/app/models/Mentor';
import { Apprentice } from 'src/app/models/Apprentice';
import { Tutor } from 'src/app/models/Tutor';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TutorTeamService } from 'src/app/services/tutor-team/tutor-team.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TutorTeam } from '@app/models/TutorTeam';

@Component({
  selector: 'app-update-team-popup',
  templateUrl: './update-team-popup.component.html',
  styleUrls: ['./update-team-popup.component.scss'],
})
export class UpdateTeamPopupComponent implements OnInit {
  public apprentice: Apprentice;
  public tutor: Tutor;
  public mentor: Mentor;

  public apprentices: Apprentice[] = [];
  public tutors: Tutor[] = [];
  public mentors: Mentor[] = [];

  public updateTeamForm: FormGroup;
  submitted: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<UpdateTeamPopupComponent>,
    private mentorService: MentorService,
    private tutorService: TutorService,
    private apprenticeService: ApprenticeService,
    private tutorTeamService: TutorTeamService,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: TutorTeam
  ) {
    this.mentor = data.mentor;
    this.apprentice = data.apprentice;
    this.tutor = data.tutor;

    this.updateTeamForm = this.formBuilder.group({
      apprentice: [this.apprentice.id, Validators.required],
      mentor: [this.mentor.id, Validators.required],
      tutor: [this.tutor.id, Validators.required],
    });
  }

  ngOnInit(): void {
    this.getApprentice();
    this.getMentor();
    this.getTutor();
  }

  public closeDialog() {
    this.dialogRef.close({ event: 'close' });
  }

  private getApprentice() {
    this.apprenticeService.getAll().subscribe({
      next: (apprenticesData) => {
        this.apprentices = apprenticesData;
      },
      error: (err) => {
        this._snackBar.open(
          '❌ Une erreur est survenue lors de la récupération des apprentis',
          'Ok',
          {
            duration: 2000,
          }
        );
      },
    });
  }

  private getTutor() {
    this.tutorService.getAll().subscribe({
      next: (tutorData) => {
        this.tutors = tutorData;
      },
      error: (err) => {
        this._snackBar.open(
          '❌ Une erreur est survenue lors de la récupération des tuteurs',
          'Ok',
          {
            duration: 2000,
          }
        );
      },
    });
  }

  private getMentor() {
    this.mentorService.getAll().subscribe({
      next: (mentorData) => {
        this.mentors = mentorData;
      },
      error: (err) => {
        this._snackBar.open(
          '❌ Une erreur est survenue lors de la récupération des maitres d apprentissage',
          'Ok',
          {
            duration: 2000,
          }
        );
      },
    });
  }

  submitTutorTeam() {
    this.submitted = true;
    if (this.updateTeamForm.valid) {
    this.tutorTeamService.update(this.updateTeamForm.value, this.data.id).subscribe({
      next: (v) => {
        this._snackBar.open('Equipe pédagohique modifiée', 'Ok', {
          duration: 2000,
        });
        this.closeDialog();
      },
      error: (err) => {
        this._snackBar.open(
          '❌ Une erreur est survenue lors de la mise à jour',
          'Ok',
          {
            duration: 2000,
          }
        );
      },
    });
  }
  }
}
