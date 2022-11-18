import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  templateUrl: './dashboard-apprentice.component.html',
  styleUrls: ['./dashboard-apprentice.component.scss'],
})
export class DashboardApprenticeComponent implements OnInit {
  public user: User;

  constructor() {
    this.user = new User(0, 'John', 'Doe', '');
  }

  ngOnInit(): void {
    const userJson = sessionStorage.getItem('user');
    if (userJson !== null) {
      this.user = JSON.parse(userJson);
    }
  }
}
