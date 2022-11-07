import { Component, Inject, OnInit, Optional, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-add-company-popup',
  templateUrl: './add-company-popup.component.html',
  styleUrls: ['./add-company-popup.component.scss']
})
export class AddCompanyPopupComponent implements OnInit {
  fromPage!: string;
  fromDialog!: string;
  selectedRole = '';
  register: any;

  constructor(public dialogRef: MatDialogRef<AddCompanyPopupComponent>,
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

    public addCompany(data: any) {

    }
}
