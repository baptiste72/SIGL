import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  showFiller = true;
  opened: boolean = true;
  public user: User;

  constructor(private authService: AuthService, private router: Router, private _snackBar: MatSnackBar) {
    this.user = new User("","","","");
  }

  public ngOnInit(): void {
    const userJson = sessionStorage.getItem("user");
    if (userJson !== null) {
      this.user = JSON.parse(userJson);
    }
  }

  public redirectTo(page: string) {
    this.router.navigate([page]);
  }

  public logout() {
    this.authService.logout().subscribe({
      next: () => {
        this._snackBar.open("Vous êtes déconnecté", "Ok", { duration: 2000});
        this.redirectTo('login');
      },
      error: (err) => {
        this._snackBar.open("❌ Identifiant ou mot de passe invalide", "Ok", { duration: 2000})
      }
    });
  }

}
