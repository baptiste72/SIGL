import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  templateUrl: './dashboard-apprentice.component.html',
  styleUrls: ['./dashboard-apprentice.component.scss']
})
export class DashboardApprenticeComponent implements OnInit {
  public user: User;

  constructor(private authService: AuthService, private _snackBar: MatSnackBar) {
    this.user = new User("Mathilde", "RENAUD", "", "")
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe({
      next: (user) => {
        this.user.firstName = user.first_name;
        this.user.lastName = user.last_name;
        this.user.email = user.email;
      },
      error: (err) => {
        this._snackBar.open("❌ Identifiant ou mot de passe invalide", "Ok", { duration: 2000})
      }
    });
  }

}
