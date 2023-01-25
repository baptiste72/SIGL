import { Component } from '@angular/core';
import { AuthService } from '@app/services';
import { User } from 'src/app/models/User';

@Component({
  templateUrl: './dashboard-apprentice.component.html',
  styleUrls: ['./dashboard-apprentice.component.scss'],
})
export class DashboardApprenticeComponent {
  public user: User;
  public apprenticeId = '';

  constructor(private authService: AuthService) {
    this.user = this.authService.userValue;
    this.apprenticeId = this.user.id.toString();
  }
}
