import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/User';

@Component({
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent implements OnInit {
  hide = true;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private _snackBar: MatSnackBar) { }

  public ngOnInit(): void {

    let sessionJson = sessionStorage.getItem('microsoftFlow');

    if (sessionJson != null && sessionJson != "") {
      let flow = JSON.parse(sessionJson);

      this.route.queryParams.subscribe(params =>  {
        flow['GET'] = {
          "code": params['code'],
          "state": params['state'],
          "session_state": params['session_state'],
          "client_info": params['client_info'],
        }
      })

      this.authService.microsoftGetUser(flow).subscribe({
        next: (user) => {
          const displayName = user.displayName.split(' ');
          let retrievedUser: User = new User(user.id, displayName[1], displayName[0], user.mail);
          sessionStorage.setItem('user', JSON.stringify(retrievedUser));
          this.router.navigate(['dashboard-apprentice']);
          this._snackBar.open("✔ Connexion via Microsoft réussie", "Ok", { duration: 2000});
        },
        error: (err) => {
          this._snackBar.open("❌ Échec de la récupération des informations utilisateur", "Ok", { duration: 2000})
        }
      });
    }
  }

  public login(data: any) {
    this.authService.login(data).subscribe({
      next: (authData) => {
        sessionStorage.setItem('token', authData.jwt);

        this.authService.getUser().subscribe({
          next: (user) => {
            let retrievedUser: User = new User(user.id, user.first_name, user.last_name, user.email);
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

  public microsoftLogin() {
    this.authService.microsoftLogin().subscribe({
      next: (flow) => {
        window.location.href = flow['auth_uri'];
        sessionStorage.setItem('microsoftFlow',JSON.stringify(flow));
      },
      error: (err) => {
        this._snackBar.open("❌ Erreur lors de la jonction avec Microsoft", "Ok", { duration: 2000})
      }
    });
  }

}
