import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@app/services';

@Component({
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  public forgotPwdForm: FormGroup;
  public title: string = 'Mot de passe oublié';

  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.forgotPwdForm = this.formBuilder.group({
      email: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params != undefined && params != null) {
        if (params['firstConnection']) {
          this.title = 'Première connexion';
        }
      }
    });
  }

  public resetPassword() {
    this.userService.resetPassword(this.forgotPwdForm.value.email).subscribe({
      next: () => {
        this.router.navigate(['/new-password']);
        this._snackBar.open('✔ Demande de changement envoyée !', 'Ok', {
          duration: 2000,
        });
      },
      error: (err) => {
        this._snackBar.open("❌ Erreur lors de l'envoi du mail", 'Ok', {
          duration: 2000,
        });
      },
    });
  }
}
