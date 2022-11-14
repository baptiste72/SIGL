import { Component, Inject, OnInit, Optional, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Form } from '@angular/forms';
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
    private formBuilder: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any
    ) { }

  ngOnInit(): void {
    this.fromDialog = "I am from dialog land...";
    this.register = {
      role: '',
      promotion: '',
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
    if(this.userFormValidator(data)) {
      this.authService.register(data).subscribe({
        next: (v) => {
          this._snackBar.open("✔ Inscription réussie", "Ok", { duration: 2000});
          this.closeDialog();
        },
        error: (err) => {
          this._snackBar.open("❌ Une erreur est survenue", "Ok", { duration: 2000})
        }
      });
    } else {
      this._snackBar.open("❌ Formulaire invalide", "Ok", { duration: 2000})
    }
}

  private userFormValidator(data: any) {

    var passwordCondition = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/g
    var emailCondition = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    var lastNameCondition = data.last_name != "" && data.last_name.length >= 2;
    var firstNameCondition = data.first_name != "" && data.first_name.length >= 2;

    //Check each field and print corresponding error message
    if(!data.role) {
      this._snackBar.open("❌ Rôle est requis", "Ok", { duration: 2000})
      return false
    }

    if(data.role == "Apprenti" && data.promotion == "") {
      this._snackBar.open("❌ Promotion est requis", "Ok", { duration: 2000})
      return false
    }

    if (!(lastNameCondition && firstNameCondition)) {
      this._snackBar.open("❌ Noms invalides", "Ok", { duration: 2000})
      return false
    }

    if(!passwordCondition.test(data.password)) {
      this._snackBar.open("❌ Mot de passe invalide", "Ok", { duration: 2000})
      return false
    }

    if(!emailCondition.test(data.email)) {
      this._snackBar.open("❌ Email invalide", "Ok", { duration: 2000})
      return false
    }

  //If no errors, return true to validate data's form
    return true
  }

  promotions: Promotion[] = [{name: 'Noether'},{name: 'Promotion2'},{name: 'Promotion3'}];
  roles: Role[] = [{name: 'Apprenti'},{name: 'Maître apprentissage'},{name: 'Tuteur pédagogique'}];
}
