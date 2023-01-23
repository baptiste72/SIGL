import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddInterviewPopupComponent } from '../../pop-up/interview/add-interview-popup/add-interview-popup.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddDeadlinePopupComponent } from '../../pop-up/deadline/add-deadline-popup/add-deadline-popup.component';
import { DeadlineService } from 'src/app/services/deadline/deadline.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Interview } from '@app/models/Interview';
import { UpdateInterviewPopupComponent } from '../../pop-up/interview/update-interview-popup/update-interview-popup.component';
import { UpdateDeadlinePopupComponent } from '@app/components/pop-up/deadline/update-deadline-popup/update-deadline-popup.component';
import { AuthService } from '@app/services/auth/auth.service';
import { Subject } from 'rxjs';
import { startOfDay } from 'date-fns';
import { CalendarEvent, DAYS_OF_WEEK, CalendarView } from 'angular-calendar';
import { InterviewService } from '@app/services/interview/interview.service';
import { YearGroupService } from '@app/services/year-group/year-group.service';
import { ViewDeadlinePopupComponent } from '@app/components/pop-up/deadline/view-deadline-popup/view-deadline-popup.component';
import { UserService } from '@app/services/user/user.service';
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
  public refresh = new Subject<void>();
  private interviews: any;
  private deadlines: any;
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
    private userService: UserService,
    private yearGroupService: YearGroupService
  ) {
    this.userId = this.authService.userValue.id;
    this.role = this.authService.userValue.role;
  }

  ngOnInit(): void {
    this.getInterviews(this.userId);
    this.yearGroupService.getAll().subscribe((yearGroups) => {
      this.yearGroups = yearGroups;
    });
    this.getDeadlines(this.userId);
    this.refresh.next();
  }

  interviewsDates: Date[] = [];

  //récupère les interviews et affiche les données
  private getInterviews(userId: number) {
    this.interviewService.getAllByUserId(userId).subscribe({
      next: (interviews) => {
        this.interviews = interviews;
        this.calendarTreatementInterviews(interviews);
        this.dataSourceInterviews = new MatTableDataSource<Interview>(
          this.interviews
        );
        this.dataSourceInterviews.paginator = this.interviewsPaginator;
        this.refresh.next();
      },
      error: (err) => {
        this._snackBar.open(
          '❌ Une erreur est survenue lors de la récupération des Entretiens',
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

  private calendarTreatementInterviews(interviews) {
    for (let interview of interviews) {
      if (interview.attendees.length == 1) {
        this.userService.getById(interview.attendees[0]).subscribe((user) => {
          let date = new Date(interview.date);
          let description = interview.description;
          let attendee1FirstName = user.first_name;
          let attendee1LastName = user.last_name;
          let event = {
            start: startOfDay(date),
            title:
              `${interview.name} - ${attendee1FirstName} ${attendee1LastName}` +
              (description ? ` : ${description}` : ''),
            color: colors.blue,
            meta: {
              interview,
            },
          };
          this.events.push(event);
          this.refresh.next();
        });
      }
      if (interview.attendees.length == 2) {
        this.userService.getById(interview.attendees[0]).subscribe((user1) => {
          let attendee1FirstName = user1.first_name;
          let attendee1LastName = user1.last_name;
          this.userService
            .getById(interview.attendees[1])
            .subscribe((user2) => {
              let attendee2FirstName = user2.first_name;
              let attendee2LastName = user2.last_name;
              let date = new Date(interview.date);
              let description = interview.description;
              let event = {
                start: startOfDay(date),
                title:
                  `${interview.name} - ${attendee1FirstName} ${attendee1LastName} & ${attendee2FirstName} ${attendee2LastName}` +
                  (description ? ` : ${description}` : ''),
                color: colors.blue,
                meta: {
                  interview,
                },
              };
              this.events.push(event);
              this.refresh.next();
            });
        });
      }
    }
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
        next: (deadline) => {
          this.deadlines = deadline;
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

  //refresh l'ensemble des données du calendrier
  private refreshAll(userId: number) {
    if (this.role === 'APPRENTICE') {
      this.deadlineService.getAllByUserId(userId).subscribe({
        next: (deadlines) => {
          this.deadlines = deadlines;
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
      this.interviewService.getAllByUserId(userId).subscribe({
        next: (interviews) => {
          this.interviews = interviews;
          this.calendarTreatementInterviews(interviews);
          this.dataSourceInterviews = new MatTableDataSource<Interview>(
            this.interviews
          );
          this.dataSourceInterviews.paginator = this.interviewsPaginator;
          this.refresh.next();
        },
        error: (err) => {
          this._snackBar.open(
            '❌ Une erreur est survenue lors de la récupération des Entretiens',
            'Ok',
            { duration: 2000 }
          );
        },
      });
    } else if (this.role === 'COORDINATOR' || this.role === 'ADMIN') {
      this.deadlineService.getAll().subscribe({
        next: (deadlines) => {
          this.deadlines = deadlines;
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

  openModifyEventDialog(event: any) {
    if (event.color.primary === '#ad2121') {
      if (this.role === 'APPRENTICE') {
        this.viewDeadline(event);
      } else if (this.role === 'COORDINATOR' || this.role === 'ADMIN') {
        this.openUpdateDeadline(event);
      }
    } else if (event.color.primary === '#1e90ff') {
      if (this.role === 'APPRENTICE') {
        this.openUpdateInterview(event.meta.interview);
      } else if (this.role === 'COORDINATOR' || this.role === 'ADMIN') {
        this.openUpdateInterview(event.meta.interview);
      }
    }
  }

  viewDeadline(event: any) {
    if (event.meta) {
      this.dialog
        .open(ViewDeadlinePopupComponent, {
          width: '600px',
          data: {
            userId: this.userId,
            deadline: event,
          },
        })
        .afterClosed()
        .subscribe((result) => {
          this.refresh.next();
        });
    }
  }

  //ouvre la pop up de création de rendez-vous
  addEvent(event: any) {
    this.dialog
      .open(AddInterviewPopupComponent, {
        width: '600px',
        data: {
          userId: this.userId,
          date: event.day.date, //valeur pop up du calendrier
        },
      })
      .afterClosed()
      .subscribe((result) => {
        this.refreshAll(this.userId);
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
        this.refreshAll(this.userId);
      });
  }

  openUpdateDeadline(deadline: any) {
    this.dialog
      .open(UpdateDeadlinePopupComponent, {
        width: '600px',
        data: {
          dataKey: deadline,
        },
      })
      .afterClosed()
      .subscribe((shouldReload: boolean) => {
        this.refreshAll(this.userId);
      });
  }

  onEventClicked(deadline) {
    let deadlineData = deadline.meta.deadline;
    this.openUpdateDeadline(deadlineData);
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
