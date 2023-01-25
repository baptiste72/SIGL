import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApprenticeService } from 'src/app/services/apprentice/apprentice.service';
import { MentorService } from 'src/app/services/mentor/mentor.service';
import { TutorService } from 'src/app/services/tutor/tutor.service';
import { Mentor } from 'src/app/models/Mentor';
import { Apprentice } from 'src/app/models/Apprentice';
import { Tutor } from 'src/app/models/Tutor';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TutorTeamService } from 'src/app/services/tutor-team/tutor-team.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-team-popup',
  templateUrl: './add-team-popup.component.html',
  styleUrls: ['./add-team-popup.component.scss'],
})
export class AddTeamPopupComponent implements OnInit {
  public addTeamForm: FormGroup;
  public submitted: boolean = false;

  public apprentices: Apprentice[] = [];
  public tutors: Tutor[] = [];
  public mentors: Mentor[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddTeamPopupComponent>,
    private mentorService: MentorService,
    private tutorService: TutorService,
    private apprenticeService: ApprenticeService,
    private tutorTeamService: TutorTeamService,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {
      this.addTeamForm = this.formBuilder.group({
      apprentice: ['', Validators.required],
      tutor: ['', Validators.required],
      mentor: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getApprentice();
    this.getMentor();
    this.getTutor();
  }

  closeDialog() {
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

  addTutorTeam() {
    this.submitted = true;
    if (this.addTeamForm.valid) {
    this.tutorTeamService.add(this.addTeamForm.value).subscribe({
      next: (v) => {
        this._snackBar.open('Equipe pédagogique ajoutée', 'Ok', {
          duration: 2000,
        });
        this.closeDialog();
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
  }
}
