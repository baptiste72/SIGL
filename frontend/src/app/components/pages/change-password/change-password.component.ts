import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '@app/services';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  public hideOld = true;
  public hideNew = true;
  public resetPasswordForm: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.resetPasswordForm = this.formBuilder.group(
      {
        currentPassword: ['', Validators.required],
        newPassword: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.checkPasswords }
    );
  }

  public resetPassword() {
    this.userService
      .changePassword({
        old_password: this.resetPasswordForm.value.currentPassword,
        new_password: this.resetPasswordForm.value.newPassword,
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
          this._snackBar.open('✔ Mot de passe modifié !', 'Ok', {
            duration: 2000,
          });
        },
        error: (err) => {
          this._snackBar.open(
            '❌ Ancien mot de passe incorrect ou nouveau mot de passe invalide (trop peu sécurisé).',
            'Ok',
            {
              duration: 2000,
            }
          );
        },
      });
  }

  private checkPasswords(form: FormGroup) {
    const pass = form.value.newPassword;
    const confirmPass = form.value.confirmPassword;

    return pass === confirmPass ? null : { notSame: true };
  }
}
