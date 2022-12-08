import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEventPopupComponent } from '../../pop-up/add-event-popup/add-event-popup.component';
import { InterviewService } from 'src/app/services/Interview/interview.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddDeadlinePopupComponent } from '../../pop-up/add-deadline-popup/add-deadline-popup.component';
<<<<<<< HEAD
import { DeadlineService } from 'src/app/services/deadline/deadline.service'
=======
import {DeadlineService} from 'src/app/services/deadline/deadline.service';
import { HttpClientModule } from '@angular/common/http';

>>>>>>> 59d7161c (Param Jasmins Karma Istanbul)

@Component({
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss']
})
export class EventsPageComponent implements OnInit {
  interviews: any;
  dialogRef: any;

  constructor(public dialog: MatDialog,
    private interviewService: InterviewService,
    private deadlineService: DeadlineService,
    private _snackBar: MatSnackBar,
    ) { }

  ngOnInit(): void {
    this.getInterviews();
  }

  public getInterviews() {
    this.interviewService.getInterviews().subscribe(response => {
      this.interviews = response;
    });
  }

  public getDeadlines() {
      this.interviewService.getInterviews().subscribe(response => {
        this.interviews = response;
      });
  }

  addEvent() {
    this.dialog.open(AddEventPopupComponent,
      {
        width: '600px'
      }
    ).afterClosed()
    .subscribe((shouldReload: boolean) => {
      this.getInterviews()
    });
  }

  addDeadline() {
    this.dialog.open(AddDeadlinePopupComponent,
      {
        width: '600px'
      }
    ).afterClosed()
    .subscribe((shouldReload: boolean) => {
      this.getDeadlines()
    });
  }
}
