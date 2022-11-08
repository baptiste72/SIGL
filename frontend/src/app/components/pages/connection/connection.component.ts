import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

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
        this._snackBar.open("✔ Connexion réussie", "Ok", { duration: 2000});
        this.router.navigate(['dashboard-apprentice'])
      },
      error: (err) => {
        this._snackBar.open("❌ Identifiant ou mot de passe invalide", "Ok", { duration: 2000})
      }
    });
  }

}
