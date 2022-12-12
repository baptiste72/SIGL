import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '@app/services';

@Component({
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  public forgotPwdForm: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.forgotPwdForm = this.formBuilder.group({
      email: ['', Validators.required],
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
