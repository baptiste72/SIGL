import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MentorService } from '@app/services/mentor/mentor.service';
import { Mentor } from '@app/models/Mentor';

@Component({
  selector: 'app-add-mentor-form',
  templateUrl: './add-mentor-form.component.html',
  styleUrls: ['./add-mentor-form.component.scss']
})
export class AddMentorFormComponent {
  mentorForm: FormGroup;
  isFormerESEO: string[] = ['Oui', 'Non'];

  //Regex validator
  private phoneValidator = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
  private stringValidator =
    /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
  private numberOnlyValidator = /^\d+$/;

  constructor(
    public dialogRef: MatDialogRef<AddMentorFormComponent>,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private mentorService: MentorService,
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

  //For tests
  public sendJSON(data: any) {
    console.log(data);
  }
  public printFormValidity(form: FormGroup) {
    console.log('Is the form invalid :', form.invalid);
  }
}

