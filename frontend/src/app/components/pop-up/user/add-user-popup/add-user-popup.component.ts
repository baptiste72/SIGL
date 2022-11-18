import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
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
  styleUrls: ['./add-user-popup.component.scss'],
})
export class AddUserPopupComponent implements OnInit {
  selectedRole = '';
  register: any;
  promotions: Promotion[] = [
    { name: 'Noether' },
    { name: 'Promotion2' },
    { name: 'Promotion3' },
  ];
  roles: Role[] = [
    { name: 'Apprenti' },
    { name: 'Maître apprentissage' },
    { name: 'Tuteur pédagogique' },
    { name: 'Compte Entreprise' },
  ];

  constructor(
    public dialogRef: MatDialogRef<AddUserPopupComponent>,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.register = {
      role: '',
      promotion: '',
      last_name: '',
      first_name: '',
      password: '',
      email: '',
    };
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close' });
  }

  public addUser(data: any) {
    if (this.userFormValidator(data)) {
      this.authService.register(data).subscribe({
        next: (v) => {
          this.displaySnackBar('✔ Inscription réussie');
          this.closeDialog();
        },
        error: (err) => {
          this.displaySnackBar('❌ Une erreur est survenue');
        },
      });
    }
  }

  private userFormValidator(data: any) {
    var passwordCondition = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/g;
    var emailCondition = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    var lastNameCondition = data.last_name != '' && data.last_name.length >= 2;
    var firstNameCondition = data.first_name != '' && data.first_name.length >= 2;

    // Vérifie chaque champs et affiche le message d'erreur correspondant
    if (!data.role) {
      this.displaySnackBar('❌ Rôle est requis');
      return false;
    }

    if (data.role == 'Apprenti' && data.promotion == '') {
      this.displaySnackBar('❌ Promotion est requis');
      return false;
    }

    if (!(lastNameCondition && firstNameCondition)) {
      this.displaySnackBar('❌ Noms invalides');
      return false;
    }

    if (!passwordCondition.test(data.password)) {
      this.displaySnackBar('❌ Mot de passe invalide');
      return false;
    }

    if (!emailCondition.test(data.email)) {
      this.displaySnackBar('❌ Email invalide');
      return false;
    }

    return true;
  }

  private displaySnackBar(msg: string) {
    this._snackBar.open(msg, 'Ok', { duration: 2000 });
  }
}
