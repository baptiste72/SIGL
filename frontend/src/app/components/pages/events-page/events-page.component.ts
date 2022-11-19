import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogState } from '@angular/material/dialog';
import { AddEventPopupComponent } from '../../pop-up/add-event-popup/add-event-popup.component';
import { InterviewService } from 'src/app/services/interview/interview.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddDeadlinePopupComponent } from '../../pop-up/add-deadline-popup/add-deadline-popup.component';
import { DeadlineService } from 'src/app/services/deadline/deadline.service';
import { MatTableDataSource } from '@angular/material/table';
import { Deadlines } from 'src/app/models/Deadlines';
import { MatPaginator } from '@angular/material/paginator';
import { Interviews } from 'src/app/models/Interviews';
import { ModifyEventPopupComponent } from '../../pop-up/modify-event-popup/modify-event-popup.component';

@Component({
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss'],
})
export class EventsPageComponent implements OnInit {
  interviews: any;
  deadlines: any;
  dialogRef: any;

  displayedColumnsInterviews: string[] = [
    'Id',
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
    //'Deliverable',
    'update',
  ];
  dataSourceDeadlines: any;
  dataSourceInterviews: any;
  @ViewChild('deadlinesPaginator') deadlinesPaginator: any = MatPaginator;
  @ViewChild('interviewsPaginator') interviewsPaginator: any = MatPaginator;

  constructor(
    public dialog: MatDialog,
    private interviewService: InterviewService,
    private deadlineService: DeadlineService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getInterviews();
    this.getDeadlines();
  }

  private getInterviews() {
    this.interviewService.getInterviews().subscribe({
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

  private getDeadlines() {
    this.deadlineService.getDeadlines().subscribe({
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

  addEvent() {
    this.dialog
      .open(AddEventPopupComponent, {
        width: '600px',
      })
      .afterClosed()
      .subscribe((shouldReload: boolean) => {
        this.getInterviews();
      });
  }

  openModifyInterview(interview: any) {
    this.dialog
      .open(ModifyEventPopupComponent, {
        width: '600px',
        data: {
          dataKey: interview,
        },
      })
      .afterClosed()
      .subscribe((shouldReload: boolean) => {
        this.getInterviews();
      });
  }

  addDeadline() {
    this.dialog
      .open(AddDeadlinePopupComponent, {
        width: '600px',
      })
      .afterClosed()
      .subscribe((shouldReload: boolean) => {
        this.getDeadlines();
      });
  }
}
