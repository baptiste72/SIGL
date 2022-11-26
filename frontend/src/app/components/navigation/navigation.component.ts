import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Role } from '@app/helpers';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  showFiller = true;
  opened: boolean = true;
  public user!: User;

  constructor(private authService: AuthService, private router: Router) {}

  public ngOnInit(): void {
    const userJson = localStorage.getItem('user');
    if (userJson !== null) {
      this.user = JSON.parse(userJson);
    }
  }

  public logout() {
    this.authService.logout();
  }
}
