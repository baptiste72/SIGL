import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddInterviewPopupComponent } from '../../pop-up/interview/add-interview-popup/add-interview-popup.component';
import { InterviewService } from '@app/services/interview/interview.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddDeadlinePopupComponent } from '../../pop-up/deadline/add-deadline-popup/add-deadline-popup.component';
import { DeadlineService } from 'src/app/services/deadline/deadline.service';
import { MatTableDataSource } from '@angular/material/table';
import { Deadline } from '@app/models/Deadline';
import { MatPaginator } from '@angular/material/paginator';
import { Interview } from '@app/models/Interview';
import { UpdateInterviewPopupComponent } from '../../pop-up/interview/update-interview-popup/update-interview-popup.component';
import { UpdateDeadlinePopupComponent } from '@app/components/pop-up/deadline/update-deadline-popup/update-deadline-popup.component';
import { AuthService } from '@app/services/auth/auth.service';
import { lastValueFrom } from 'rxjs';
import { startOfDay } from 'date-fns';
import { CalendarEvent, DAYS_OF_WEEK, CalendarView } from 'angular-calendar';
import { ConfirmDeleteComponent } from '@app/components/pop-up/confirm-delete/confirm-delete.component';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss'],
})
export class EventsPageComponent implements OnInit {
  interviews: any;
  deadlines: any;
  dialogRef: any;
  private userId: number;

  view: CalendarView = CalendarView.Month;
  locale: string = 'fr';

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];

  CalendarView = CalendarView;
  viewDate: Date = new Date();

  displayedColumnsInterviews: string[] = [
    'Name',
    'Date',
    'First_hour',
    'Last_hour',
    'Description',
    'Guest',
    'Semester',
    'update',
  ];
  displayedColumnsDeadlines: string[] = [
    'Name',
    'Date',
    'Description',
    'update',
  ];
  dataSourceDeadlines: any;
  dataSourceInterviews: any;
  selectedInterviewDates: { date: Date; id: number }[] = [];

  @ViewChild('deadlinesPaginator') deadlinesPaginator: any = MatPaginator;
  @ViewChild('interviewsPaginator') interviewsPaginator: any = MatPaginator;
  events: CalendarEvent[] = [
    {
      start: startOfDay(new Date()),
      title: "Aujourd'hui",
      color: colors.yellow,
    },
  ];

  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
    private interviewService: InterviewService,
    private deadlineService: DeadlineService,
    private _snackBar: MatSnackBar,
    private confirmDeleteDialogRef: MatDialogRef<ConfirmDeleteComponent>
  ) {
    this.userId = this.authService.userValue.id;
  }

  ngOnInit(): void {
    this.getInterviewDates(this.userId);
    this.getInterviews(this.userId);
    this.getDeadlines(this.userId);
  }

  public async openConfirmDeletePopup(content: string): Promise<boolean> {
    this.confirmDeleteDialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '600px',
    });

    this.confirmDeleteDialogRef.componentInstance.content = content;

    return await lastValueFrom(this.confirmDeleteDialogRef.afterClosed());
  }

  interviewsDates: Date[] = [];

  private getInterviewDates(userId: number) {
    this.interviewService.getAllByUserId(userId).subscribe({
      next: (interviews) => {
        this.interviewsDates = interviews.map((interview) => interview.date);
      },
      error: (err) => {
        this._snackBar.open(
          '❌ Une erreur est survenue lors de la récupération des entretiens',
          'Ok',
          { duration: 2000 }
        );
      },
    });
  }

  private getInterviews(userId: number) {
    this.interviewService.getAllByUserId(userId).subscribe({
      next: (interviews) => {
        this.interviews = interviews;
        this.dataSourceInterviews = new MatTableDataSource<Interview>(
          this.interviews
        );
        this.dataSourceInterviews.paginator = this.interviewsPaginator;
      },
      error: (err) => {
        this._snackBar.open(
          '❌ Une erreur est survenue lors de la récupération des semestres',
          'Ok',
          { duration: 2000 }
        );
      },
    });
  }

  private getDeadlines(userId: number) {
    this.deadlineService.get(userId).subscribe({
      next: (v) => {
        this.deadlines = v;
        this.dataSourceDeadlines = new MatTableDataSource<Deadline>(
          this.deadlines
        );
        this.dataSourceDeadlines.paginator = this.deadlinesPaginator;
      },
      error: (err) => {
        this._snackBar.open(
          '❌ Une erreur est survenue lors de la récupération des Deadlines',
          'Ok',
          { duration: 2000 }
        );
      },
    });
  }

  addEvent() {
    this.dialog
      .open(AddInterviewPopupComponent, {
        width: '600px',
        data: {
          userId: this.userId,
        },
      })
      .afterClosed()
      .subscribe((shouldReload: boolean) => {
        this.getInterviews(this.userId);
      });
  }

  openUpdateInterview(interview: Interview) {
    this.dialog
      .open(UpdateInterviewPopupComponent, {
        width: '600px',
        data: {
          interview: interview,
          userId: this.userId,
        },
      })
      .afterClosed()
      .subscribe((shouldReload: boolean) => {
        this.getInterviews(this.userId);
      });
  }

  public async deleteInterviewById(id: any) {
    const shouldDelete = await this.openConfirmDeletePopup(
      'Souhaitez-vous vraiment supprimer cet évènement ?'
    );
    if (shouldDelete) {
      this.interviewService.delete(id).subscribe({
        next: (v) => {
          this.getInterviews(this.userId);
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

  public async deleteDeadlineById(id: any) {
    const shouldDelete = await this.openConfirmDeletePopup(
      'Souhaitez-vous vraiment supprimer cet échéance ?'
    );
    if (shouldDelete) {
      this.interviewService.delete(id).subscribe({
        next: (v) => {
          this.getDeadlines(this.userId);
        },
        error: (err) => {
          this._snackBar.open(
            "❌ Une erreur est survenue lors de la suppression de l'échéance",
            'Ok',
            { duration: 2000 }
          );
        },
      });
    }
  }

  openModifyDeadline(deadline: any) {
    this.dialog
      .open(UpdateDeadlinePopupComponent, {
        width: '600px',
        data: {
          dataKey: deadline,
        },
      })
      .afterClosed()
      .subscribe((shouldReload: boolean) => {
        this.getDeadlines(this.userId);
      });
  }

  addDeadline() {
    this.dialog
      .open(AddDeadlinePopupComponent, {
        width: '600px',
      })
      .afterClosed()
      .subscribe((shouldReload: boolean) => {
        this.getDeadlines(this.userId);
      });
  }
}
