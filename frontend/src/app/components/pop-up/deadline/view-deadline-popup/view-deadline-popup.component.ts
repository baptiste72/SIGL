import { Component, Inject, OnInit, Optional } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { YearGroupService } from '@app/services/year-group/year-group.service';
import moment from 'moment';

@Component({
  selector: 'app-view-deadline-popup',
  templateUrl: './view-deadline-popup.component.html',
  styleUrls: ['./view-deadline-popup.component.scss'],
})
export class ViewDeadlinePopupComponent implements OnInit {
  public js_deadline: any;
  public yearGroups: any;
  public deadlineFrenchFormat: any;

  constructor(
    public dialogRef: MatDialogRef<ViewDeadlinePopupComponent>,
    private yearGroupService: YearGroupService,
    public dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any
  ) {}

  ngOnInit(): void {
    this.yearGroupService.getAll().subscribe((yearGroups) => {
      this.yearGroups = yearGroups;
    });
    this.js_deadline = this.mydata.deadline.meta.deadline;
    this.deadlineFrenchFormat = moment(this.js_deadline.date)
      .locale('fr')
      .format('LL');
  }

  closeDialog() {
    this.dialogRef.close({ deadline: 'close', data: this.js_deadline });
  }
}
