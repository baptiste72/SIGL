import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MentorService } from '@app/services/mentor/mentor.service';
import { ApprenticeService } from '@app/services/apprentice/apprentice.service';

@Component({
  selector: 'app-add-apprentice-popup',
  templateUrl: './add-apprentice-popup.component.html',
  styleUrls: ['./add-apprentice-popup.component.scss'],
})
export class AddApprenticePopupComponent {
  apprenticeForm: FormGroup;
  fromDialog!: string;

  //Regex validator
  private phoneValidator = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
  private stringValidator =
    /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
  private numberOnlyValidator = /^\d+$/;

  constructor(
    public dialogRef: MatDialogRef<AddApprenticePopupComponent>,
    private apprenticeService: ApprenticeService,
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder
  ) {
    this.apprenticeForm = this._formBuilder.group({
      app_last_name: [
        'heck',
        [Validators.required, Validators.pattern(this.stringValidator)],
      ],
      app_first_name: [
        'jojo',
        [Validators.required, Validators.pattern(this.stringValidator)],
      ],
      app_job_title: [
        'boss',
        [Validators.required, Validators.pattern(this.stringValidator)],
      ],
      app_description: ['oui', Validators.required],
      app_phone: [
        '666',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern(this.phoneValidator),
        ],
      ],
      app_collective_convention: ['123', Validators.required],
      app_working_hours: [
        '35',
        [Validators.required, Validators.pattern(this.numberOnlyValidator)],
      ],
      app_comp_name: [''],
      app_siret: [''],
      app_location: [''],
    });
  }

  public addApprentice(data: any) {
    this.apprenticeService.add(data).subscribe({
      next: (v) => {
        this.displaySnackBar("✔ Données de l'apprenti enregistrées ");
        this.closeDialog();
      },
      error: (err) => {
        this.displaySnackBar('❌ Une erreur est survenue');
      },
    });
  }

  public closeDialog() {
    this.dialogRef.close({ event: 'close', data: this.fromDialog });
  }

  private displaySnackBar(msg: string) {
    this._snackBar.open(msg, 'Ok', { duration: 2000 });
  }

  //For tests
  public sendJSON(data: any) {
    console.log(data);
  }
  public printFormValidity(form: FormGroup) {
    console.log('Is the form invalid :', form.invalid);
  }
}
