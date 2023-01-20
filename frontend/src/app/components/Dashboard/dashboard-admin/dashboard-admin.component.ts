import { Component } from '@angular/core';

@Component({
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss'],
})
export class DashboardAdminComponent {
  public apprenticeId ='';
  public hasLoaded: boolean = false;

  constructor( ) {}

  onApprenticeChanged(id: string) {
    this.apprenticeId = id;
    this.hasLoaded = true;
  }
}
