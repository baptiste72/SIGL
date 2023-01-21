import { Component, Inject, OnInit, Optional } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { InterviewService } from '@app/services/interview/interview.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Interview } from '@app/models/Interview';
import { ApprenticeService } from '@app/services/apprentice/apprentice.service';
import { TutorTeamService } from '@app/services/tutor-team/tutor-team.service';
import { UserService } from '@app/services/user/user.service';
import { Semester } from '@app/models/Semester';
import { SemesterService } from '@app/services/semester/semester.service';
import { ConfirmDeleteComponent } from '../../confirm-delete/confirm-delete.component';
import { lastValueFrom } from 'rxjs';

interface Attendees {
  name: string;
}
@Component({
  selector: 'app-update-interview-popup',
  templateUrl: './update-interview-popup.component.html',
  styleUrls: ['./update-interview-popup.component.scss'],
})
export class UpdateInterviewPopupComponent implements OnInit {
  interview: any;
  tutorTeam: any;

  public semesters: Semester[] = [];
  guests: Attendees[] = [
    { name: 'Equipe tutorale' },
    { name: "Maitre d'apprentissage" },
    { name: 'tuteur pédagogique' },
  ];
  test: any;
  constructor(
    public dialogRef: MatDialogRef<UpdateInterviewPopupComponent>,
    private interviewService: InterviewService,
    public dialog: MatDialog,
    private tutorTeamService: TutorTeamService,
    private apprenticeService: ApprenticeService,
    private userService: UserService,
    private confirmDeleteDialogRef: MatDialogRef<ConfirmDeleteComponent>,
    private semesterService: SemesterService,
    private _snackBar: MatSnackBar,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  fromDialog!: string;

  ngOnInit(): void {
    this.test = '';
    this.interview = this.data.interview;
    console.log(this.interview);
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

  public async openConfirmDeletePopup(content: string): Promise<boolean> {
    this.confirmDeleteDialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '600px',
    });

    this.confirmDeleteDialogRef.componentInstance.content = content;

    return await lastValueFrom(this.confirmDeleteDialogRef.afterClosed());
  }

  public async deleteInterviewById(id: any) {
    const shouldDelete = await this.openConfirmDeletePopup(
      'Souhaitez-vous vraiment supprimer cet évènement ?'
    );
    if (shouldDelete) {
      this.interviewService.delete(id).subscribe({
        next: (v) => {
          this._snackBar.open('✔ Evénement supprimé', 'Ok', { duration: 2000 });
          this.closeDialog();
        },
        error: (err) => {
          this._snackBar.open(
            "❌ Une erreur est survenue lors de la suppression de l'évènement",
            'Ok',
            { duration: 2000 }
          );
        },
      });
    }
  }

  public updateInterview(interview: any) {
    if (interview.attendees === 'Equipe tutorale') {
      interview.attendees = [this.tutorTeam.mentor.id, this.tutorTeam.tutor.id];
    }
    if (interview.attendees === "Maitre d'apprentissage") {
      interview.attendees = [this.tutorTeam.mentor.id];
    }
    if (interview.attendees === 'tuteur pédagogique') {
      interview.attendees = [this.tutorTeam.tutor.id];
    }
    this.interviewService.update(interview, interview.id).subscribe({
      next: (v) => {
        this._snackBar.open('✔ Entretien modifié', 'Ok', { duration: 2000 });
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
