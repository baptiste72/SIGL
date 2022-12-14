/* import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MentorService } from '@app/services/mentor/mentor.service';
import { Mentor } from '@app/models/Mentor';

@Component({
  selector: 'app-add-company-popup',
  templateUrl: './add-company-popup.component.html',
  styleUrls: ['./add-company-popup.component.scss'],
})
export class AddApprenticePopupComponent {
  mentorForm: FormGroup;
  apprenticeForm: FormGroup;

  //Regex validator
  private phoneValidator = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
  private stringValidator =
    /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
  private numberOnlyValidator = /^\d+$/;

  constructor(
    public dialogRef: MatDialogRef<AddApprenticePopupComponent>,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,

    private mentorService: MentorService,

    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any
  ) {
    this.mentorForm = this._formBuilder.group({
      mt_last_name: [
        'LACREUSE',
        [Validators.required, Validators.pattern(this.stringValidator)],
      ],
      mt_first_name: [
        'Guillaume',
        [Validators.required, Validators.pattern(this.stringValidator)],
      ],
      mt_phone: [
        '0000000000',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern(this.phoneValidator),
        ],
      ],
      mt_email: ['guigui@soco.com', [Validators.required, Validators.email]],
      mt_job_title: [
        'Le boss',
        [Validators.required, Validators.pattern(this.stringValidator)],
      ],
      mt_last_diploma: ['CAP chaudronerie', Validators.required],
      mt_former_eseo: ['Oui', Validators.required],
    });

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

  public addMentor(mentor: Mentor) {
    this.mentorService.add(mentor).subscribe({
      next: (v) => {
        this._snackBar.open('✔ Données des contacts enregistrées', 'Ok', {
          duration: 2000,
        });
      },
      error: (err) => {
        console.log(err);
        this._snackBar.open('❌ Une erreur est survenue', 'Ok', {
          duration: 2000,
        });
      },
    });
  }

  public addApprenticeInfo(form: FormGroup) {}

  //For tests
  public sendJSON(data: any) {
    console.log(data);
  }
  public printFormValidity(form: FormGroup) {
    console.log('Is the form invalid :', form.invalid);
  }
}
 */
