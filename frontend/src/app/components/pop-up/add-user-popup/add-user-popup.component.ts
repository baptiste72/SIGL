import { Component, Inject, OnInit, Optional, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth/auth.service';

interface Promotion {
  name: string;
}

interface Role {
  name: string;
}

@Component({
  selector: 'app-add-user-popup',
  templateUrl: './add-user-popup.component.html',
  styleUrls: ['./add-user-popup.component.scss']
})
export class AddUserPopupComponent implements OnInit {
  fromPage!: string;
  fromDialog!: string;
  selectedRole = '';
  register: any;

  constructor(public dialogRef: MatDialogRef<AddUserPopupComponent>,
    private authService: AuthService, private _snackBar: MatSnackBar,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any
    ) { }

  ngOnInit(): void {
    this.fromDialog = "I am from dialog land...";
    this.register = {
      last_name : '',
      first_name : '',
      password : '',
      email :''
    };
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close', data: this.fromDialog });
  }

  public addUser(data: any) {
     this.authService.register(data).subscribe({
      next: (v) => {
        this._snackBar.open("✔ Inscription réussie", "Ok", { duration: 2000});
        this.closeDialog();
      },
      error: (err) => {
        this._snackBar.open("❌ Une erreur est survenue", "Ok", { duration: 2000})
      }
    });
}


  promotions: Promotion[] = [{name: 'Noether'},{name: 'Promotion2'},{name: 'Promotion3'}];
  roles: Role[] = [{name: 'Apprenti'},{name: 'Maître apprentissage'},{name: 'Tuteur pédagogique'}];
}
