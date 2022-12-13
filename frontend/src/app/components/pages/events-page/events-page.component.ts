import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogState } from '@angular/material/dialog';
import { AddInterviewPopupComponent } from '../../pop-up/interview/add-interview-popup/add-interview-popup.component';
import { InterviewService } from 'src/app/services/interview/interview.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddDeadlinePopupComponent } from '../../pop-up/deadline/add-deadline-popup/add-deadline-popup.component';
import { DeadlineService } from 'src/app/services/deadline/deadline.service';
import { MatTableDataSource } from '@angular/material/table';
import { Deadlines } from 'src/app/models/Deadlines';
import { MatPaginator } from '@angular/material/paginator';
import { Interviews } from 'src/app/models/Interviews';
import { ModifyInterviewPopupComponent } from '../../pop-up/interview/modify-interview-popup/modify-interview-popup.component';
import { DeleteInterviewPopupComponent } from '../../pop-up/interview/delete-interview-popup/delete-interview-popup.component';
import { DeleteDeadlinePopupComponent } from '@app/components/pop-up/deadline/delete-deadline-popup/delete-deadline-popup.component';
import { ModifyDeadlinePopupComponent } from '@app/components/pop-up/deadline/modify-deadline-popup/modify-deadline-popup.component';
import { AuthService } from '@app/services/auth/auth.service';
import { Subject } from 'rxjs';

import { startOfDay } from 'date-fns';
import { CalendarEvent, DAYS_OF_WEEK, CalendarView } from 'angular-calendar';

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
  refresh: Subject<any> = new Subject();

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
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const userId = this.getUserId();

    this.getInterviewDates(userId);
    this.getInterviews(userId);
    this.getDeadlines(userId);
  }

  interviewsDates: Date[] = [];

  private getInterviewDates(userId: number) {
    this.interviewService.getInterviews(userId).subscribe({
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
    this.interviewService.getInterviews(userId).subscribe({
      next: (v) => {
        this.interviews = v;
        this.dataSourceInterviews = new MatTableDataSource<Interviews>(v);
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
    this.deadlineService.getDeadlines(userId).subscribe({
      next: (v) => {
        this.deadlines = v;
        this.dataSourceDeadlines = new MatTableDataSource<Deadlines>(v);
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

  private getUserId(): number {
    return this.authService.userValue.id;
  }

  addEvent() {
    this.dialog
      .open(AddInterviewPopupComponent, {
        width: '600px',
      })
      .afterClosed()
      .subscribe((shouldReload: boolean) => {
        this.getInterviews(this.getUserId());
      });
  }

  openModifyInterview(interview: any) {
    this.dialog
      .open(ModifyInterviewPopupComponent, {
        width: '600px',
        data: {
          dataKey: interview,
        },
      })
      .afterClosed()
      .subscribe((shouldReload: boolean) => {
        this.getInterviews(this.getUserId());
      });
  }

  openDeleteInterviewDialog(interview: any) {
    this.dialog
      .open(DeleteInterviewPopupComponent, {
        width: '550px',
        data: {
          dataKey: interview.id,
        },
      })
      .afterClosed()
      .subscribe((shouldReload: boolean) => {
        this.getInterviews(this.getUserId());
      });
  }

  openModifyDeadline(deadline: any) {
    this.dialog
      .open(ModifyDeadlinePopupComponent, {
        width: '600px',
        data: {
          dataKey: deadline,
        },
      })
      .afterClosed()
      .subscribe((shouldReload: boolean) => {
        this.getDeadlines(this.getUserId());
      });
  }

  openDeleteDeadlineDialog(deadline: any) {
    this.dialog
      .open(DeleteDeadlinePopupComponent, {
        width: '550px',
        data: {
          dataKey: deadline.id,
        },
      })
      .afterClosed()
      .subscribe((shouldReload: boolean) => {
        this.getDeadlines(this.getUserId());
      });
  }

  addDeadline() {
    this.dialog
      .open(AddDeadlinePopupComponent, {
        width: '600px',
      })
      .afterClosed()
      .subscribe((shouldReload: boolean) => {
        this.getDeadlines(this.getUserId());
      });
  }
}
