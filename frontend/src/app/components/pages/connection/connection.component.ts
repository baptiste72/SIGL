import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { User } from 'src/app/models/User';

@Component({
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent {
  hide = true;

  constructor(private authService: AuthService, private router: Router, private _snackBar: MatSnackBar) { }

  public login(data: any) {
    this.authService.login(data).subscribe({
      next: (authData) => {
        sessionStorage.setItem('token', authData.jwt);

        this.authService.getUser().subscribe({
          next: (user) => {
            let retrievedUser: User = new User(user.first_name, user.last_name, "", user.email);
            sessionStorage.setItem('user', JSON.stringify(retrievedUser));
            this.router.navigate(['dashboard-apprentice']);
            this._snackBar.open("✔ Connexion réussie", "Ok", { duration: 2000});
          },
          error: (err) => {
            this._snackBar.open("❌ Échec de la récupération des informations utilisateur", "Ok", { duration: 2000})
          }
        });

      },
      error: (err) => {
        this._snackBar.open("❌ Identifiant ou mot de passe invalide", "Ok", { duration: 2000})
      }
    });
  }

}
