import { Component } from '@angular/core';
import { Role } from '@app/helpers';
import { User } from '@app/models/User';
import { AuthService } from '@app/services';

@Component({
  templateUrl: './evaluations-page.component.html',
  styleUrls: ['./evaluations-page.component.scss'],
})
export class EvaluationsPageComponent {
  readonly roleEnum = Role;
  public user: User;
  public apprenticeId = '';

  constructor(private authService: AuthService) {
    this.user = this.authService.userValue;
    this.apprenticeId = this.user.id.toString();
  }
}
