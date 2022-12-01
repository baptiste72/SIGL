import { Component } from '@angular/core';
import { AuthService } from '@app/services';
import { User } from 'src/app/models/User';

@Component({
  templateUrl: './personal-informations.component.html',
  styleUrls: ['./personal-informations.component.scss'],
})
export class PersonalInformationsComponent {
  public user: User;

  constructor(private authService: AuthService) {
    this.user = this.authService.userValue;
  }
}
