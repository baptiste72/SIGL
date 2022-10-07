import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogState } from '@angular/material/dialog';
import { AddEventPopupComponent } from '../../pop-up/add-event-popup/add-event-popup.component';
import {InterviewService} from 'src/app/services/interview/interview.service'
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss']
})
export class EventsPageComponent implements OnInit {
  interviews: any;
  dialogRef: any;
  constructor(public dialog: MatDialog,
    private interviewService: InterviewService,private _snackBar: MatSnackBar,
    ) { }

  ngOnInit(): void {
    this.getInterviews();
    const dialogRef = this.dialog
    .open(AddEventPopupComponent)
    .afterClosed()
    .subscribe((shouldReload: boolean) => {
      this.getInterviews()
    });
  }

  public getInterviews() {
    this.interviewService.getInterviews().subscribe(response => {
      this.interviews = response;
    });
}

  addEvent() {
    this.dialog.open(AddEventPopupComponent,
      {
        width: '600px'
      }
    );
  }
}
