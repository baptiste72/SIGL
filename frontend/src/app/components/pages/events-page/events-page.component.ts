import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEventPopupComponent } from '../../pop-up/add-event-popup/add-event-popup.component';

@Component({
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss']
})
export class EventsPageComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  addEvent() {
    this.dialog.open(AddEventPopupComponent,
      {
        width: '600px'
      }
    );
  }
}
