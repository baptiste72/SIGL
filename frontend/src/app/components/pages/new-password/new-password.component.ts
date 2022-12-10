import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '@app/services';

@Component({
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss'],
})
export class NewPasswordComponent {
  hide = true;
  public resetPasswordForm: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.resetPasswordForm = this.formBuilder.group(
      {
        token: ['', Validators.required],
        newPassword: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.checkPasswords }
    );
  }

  public resetPassword() {
    this.userService
      .setNewPassword({
        token: this.resetPasswordForm.value.token,
        password: this.resetPasswordForm.value.newPassword,
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/login']);
          this._snackBar.open('✔ Mot de passe modifié !', 'Ok', {
            duration: 2000,
          });
        },
        error: (err) => {
          this._snackBar.open('❌ Token incorrect', 'Ok', {
            duration: 2000,
          });
        },
      });
  }

  private checkPasswords(form: FormGroup) {
    const pass = form.value.newPassword;
    const confirmPass = form.value.confirmPassword;

    return pass === confirmPass ? null : { notSame: true };
  }
}
