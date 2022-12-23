import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MentorService } from '@app/services/mentor/mentor.service';

@Component({
  selector: 'app-add-apprentice-form',
  templateUrl: './add-apprentice-form.component.html',
  styleUrls: ['./add-apprentice-form.component.scss']
})
export class AddApprenticeFormComponent {
  apprenticeForm: FormGroup;

    //Regex validator
    private phoneValidator = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
    private stringValidator =
      /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
    private numberOnlyValidator = /^\d+$/;

    constructor(
      public dialogRef: MatDialogRef<AddApprenticeFormComponent>,
      private authService: AuthService,
      private _snackBar: MatSnackBar,
      private _formBuilder: FormBuilder,
      private mentorService: MentorService,
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

    //For tests
    public sendJSON(data: any) {
      console.log(data);
    }
    public printFormValidity(form: FormGroup) {
      console.log('Is the form invalid :', form.invalid);
    }
  }




