import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-add-company-popup',
  templateUrl: './add-company-popup.component.html',
  styleUrls: ['./add-company-popup.component.scss'],
})
export class AddCompanyPopupComponent implements OnInit {
  selectedRole = '';
  register: any;

  constructor(
    public dialogRef: MatDialogRef<AddCompanyPopupComponent>,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.register = {
      last_name: '',
      first_name: '',
      password: '',
      email: '',
    };
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close' });
  }

  public addCompany(data: any) {}
}
