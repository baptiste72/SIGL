import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddInterviewPopupComponent } from '../../pop-up/interview/add-interview-popup/add-interview-popup.component';
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
import { lastValueFrom, Subject } from 'rxjs';
import { startOfDay } from 'date-fns';
import { CalendarEvent, DAYS_OF_WEEK, CalendarView } from 'angular-calendar';
import { ConfirmDeleteComponent } from '@app/components/pop-up/confirm-delete/confirm-delete.component';
import { InterviewService } from '@app/services/interview/interview.service';
import { YearGroupService } from '@app/services/year-group/year-group.service';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss'],
})
export class EventsPageComponent implements OnInit {
  refresh = new Subject<void>();
  interviews: any;
  deadlines: any;
  dialogRef: any;
  private userId: number;
  private role: any;
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
  yearGroups: any;
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
    private confirmDeleteDialogRef: MatDialogRef<ConfirmDeleteComponent>,
    private yearGroupService: YearGroupService
  ) {
    this.userId = this.authService.userValue.id;
    this.role = this.authService.userValue.role;
  }

  ngOnInit(): void {
    //this.getInterviewDates(this.userId);
    //this.getInterviews(this.userId);
    this.yearGroupService.getAll().subscribe((yearGroups) => {
      this.yearGroups = yearGroups;
    });
    this.getDeadlines(this.userId);
    this.refresh.next();
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

  getYearGroupName(id: number) {
    let yearGroupName = '';
    this.yearGroups.forEach((yearGroup) => {
      if (yearGroup.id === id) {
        yearGroupName = yearGroup.worded;
      }
    });
    return yearGroupName;
  }

  private calendarTreatementDeadlines(deadlines) {
    for (let deadline of deadlines) {
      let date = new Date(deadline.date);
      let description = deadline.description;
      let promotion = this.getYearGroupName(deadline.yearGroup);
      let event = {
        start: startOfDay(date),
        title:
          `${deadline.name} - ${promotion}` +
          (description ? ` : ${description}` : ''),
        color: colors.red,
        meta: {
          deadline,
        },
      };
      this.events.push(event);
    }
  }

  private pushDeadline(deadline) {
    let date = new Date(deadline.date);
    let description = deadline.description;
    let promotion = deadline.yearGroup;
    let event = {
      start: startOfDay(date),
      title: `${deadline.name} ${promotion} : ${description}`,
      color: colors.red,
      meta: {
        deadline,
      },
    };
    this.events.push(event);
  }

  private getDeadlines(userId: number) {
    if (this.role === 'APPRENTICE') {
      this.deadlineService.getAllByUserId(userId).subscribe({
        next: (v) => {
          this.deadlines = v;
          this.calendarTreatementDeadlines(this.deadlines);
          this.refresh.next();
        },
        error: (err) => {
          this._snackBar.open(
            '❌ Une erreur est survenue lors de la récupération des Deadlines',
            'Ok',
            { duration: 2000 }
          );
        },
      });
    } else if (this.role === 'COORDINATOR' || this.role === 'ADMIN') {
      this.deadlineService.getAll().subscribe({
        next: (v) => {
          this.deadlines = v;
          this.calendarTreatementDeadlines(this.deadlines);
          this.refresh.next();
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
  }

  private refreshDeadlines(userId: number) {
    if (this.role === 'APPRENTICE') {
      this.deadlineService.getAllByUserId(userId).subscribe({
        next: (v) => {
          this.deadlines = v;
          this.events = [
            {
              start: startOfDay(new Date()),
              title: "Aujourd'hui",
              color: colors.yellow,
            },
          ];
          this.calendarTreatementDeadlines(this.deadlines);
          this.refresh.next();
        },
        error: (err) => {
          this._snackBar.open(
            '❌ Une erreur est survenue lors de la récupération des Deadlines',
            'Ok',
            { duration: 2000 }
          );
        },
      });
    } else if (this.role === 'COORDINATOR' || this.role === 'ADMIN') {
      this.deadlineService.getAll().subscribe({
        next: (v) => {
          this.deadlines = v;
          this.events = [
            {
              start: startOfDay(new Date()),
              title: "Aujourd'hui",
              color: colors.yellow,
            },
          ];
          this.calendarTreatementDeadlines(this.deadlines);
          this.refresh.next();
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
  }

  openCreateEventDialog(event: any) {
    if (this.role === 'APPRENTICE') {
      this.addEvent(event);
    } else if (this.role === 'COORDINATOR' || this.role === 'ADMIN') {
      this.addDeadline(event);
    }
  }

  addEvent(event: any) {
    this.dialog
      .open(AddInterviewPopupComponent, {
        width: '600px',
        data: {
          userId: this.userId,
          date: event.day.date,
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result.event === 'add') {
          this.pushDeadline(result.data);
          this.refresh.next();
        }
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
      .subscribe((result) => {
        if (result.event === 'add') {
          this.pushDeadline(result.data);
          this.refresh.next();
        }
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
        this.refreshDeadlines(this.userId);
      });
  }

  onEventClicked(deadline) {
    let deadlineData = deadline.meta.deadline;
    this.openModifyDeadline(deadlineData);
  }

  addDeadline(deadline: any) {
    this.dialog
      .open(AddDeadlinePopupComponent, {
        width: '600px',
        data: {
          userId: this.userId,
          date: deadline.day.date,
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result.event === 'add') {
          this.pushDeadline(result.data);
          this.refresh.next();
        }
      });
  }
}
