import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/services';
import { UserService } from '@app/services/user/user.service';
import { User } from 'src/app/models/User';

@Component({
  templateUrl: './personal-informations.component.html',
  styleUrls: ['./personal-informations.component.scss'],
})
export class PersonalInformationsComponent implements OnInit {
  public user: User;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {
    this.user = this.authService.userValue;
  }

  ngOnInit(): void {
    this.userService.getById(this.user.id).subscribe({
      next: (user) => {
        this.user = user;
      },
    });
  }

  public changePassword() {
    this.router.navigate(['/change-password']);
  }
}
