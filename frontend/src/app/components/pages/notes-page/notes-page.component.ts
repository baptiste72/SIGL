import { Component } from '@angular/core';


@Component({
  templateUrl: './notes-page.component.html',
  styleUrls: ['./notes-page.component.scss'],
})
export class NotesPageComponent {
  public apprenticeId ='';

  constructor() { }

  onApprenticeChanged(id: string) {
    this.apprenticeId = id;
  }
}
