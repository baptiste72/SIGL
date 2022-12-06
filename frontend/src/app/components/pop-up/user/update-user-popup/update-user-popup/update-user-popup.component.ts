import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-user-popup',
  templateUrl: './update-user-popup.component.html',
  styleUrls: ['./update-user-popup.component.scss'],
})
export class UpdateUserPopupComponent {
  fromPage!: string;
  fromDialog!: string;

  constructor(
    public dialogRef: MatDialogRef<UpdateUserPopupComponent>,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {}

  closeDialog() {
    this.dialogRef.close({ event: 'close', data: this.fromDialog });
  }

  updateUser(data: any) {
    this.userService.updateUser(data).subscribe({
      next: (v) => {
        this._snackBar.open('✔ Utilisateur modifié', 'Ok', { duration: 2000 });
        this.closeDialog();
      },
      error: (err) => {
        this._snackBar.open(
          "❌ Une erreur est survenue lors de la modificaiton de l'utilisateur",
          'Ok',
          { duration: 2000 }
        );
      },
    });
  }
}
