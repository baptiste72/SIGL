import { Component, Inject, OnInit, Optional, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { ApprenticeService } from 'src/app/services/apprentice/apprentice.service';
import { MentorService } from 'src/app/services/mentor/mentor.service';
import { TutorService } from 'src/app/services/tutor/tutor.service';
import { Mentor } from 'src/app/models/Mentor';
import { Apprentice } from 'src/app/models/Apprentice';
import { Tutor } from 'src/app/models/Tutor';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TutorTeamService } from 'src/app/services/tutor-team/tutor-team.service';

@Component({
  selector: 'app-add-team-popup',
  templateUrl: './add-team-popup.component.html',
  styleUrls: ['./add-team-popup.component.scss']
})
export class AddTeamPopupComponent implements OnInit {
  fromPage!: string;
  fromDialog!: string;
  register: any;

  apprentices: Apprentice[] = [];
  tutors: Tutor[] = [];
  mentors: Mentor[] = [];

  constructor(public dialogRef: MatDialogRef<AddTeamPopupComponent>,
    private mentorService: MentorService,
    private tutorService: TutorService,
    private apprenticeService: ApprenticeService,
    private tutorTeamService: TutorTeamService,
    private _snackBar: MatSnackBar,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any
    ) { }

  ngOnInit(): void {
    this.getApprentice();
    this.getMentor();
    this.getTutor();
    this.register = {
      mentor: '',
      tutor: '',
      apprentice: '',
    }
  }

  closeDialog() { this.dialogRef.close({ event: 'close', data: this.fromDialog }); }

  private getApprentice() {
    this.apprenticeService.getApprentice().subscribe({
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
    this.tutorService.getTutor().subscribe({
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
    this.mentorService.getMentor().subscribe({
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

  addTutorTeam(data: any) {
    this.tutorTeamService.addTutorTeams(data).subscribe({
      next: (v) => {
        this._snackBar.open('Equipe pédagohique ajoutée', 'Ok', { duration: 2000 } );
        this.closeDialog()
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
