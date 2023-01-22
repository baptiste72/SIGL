import { Component } from '@angular/core';
import { Role } from '@app/helpers';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  showFiller = true;
  opened: boolean = true;
  public user: User;
  readonly roleEnum = Role;

  constructor(private authService: AuthService) {
    this.user = this.authService.userValue;
  }

  public logout() {
    this.authService.logout();
  }
}
