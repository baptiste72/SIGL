import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mentor } from '@app/models/Mentor';
import { UserService } from '@app/services';
import { CompanyUser } from '@app/models/CompanyUser';
import { RegexService } from '@app/services/regex/regex.service';

@Component({
  selector: 'app-add-mentor-popup',
  templateUrl: './add-mentor-popup.component.html',
  styleUrls: ['./add-mentor-popup.component.scss'],
})
export class AddMentorPopupComponent {
  mentorForm: FormGroup;
  isFormerESEO: string[] = ['Oui', 'Non'];
  fromDialog!: string;

  constructor(
    public dialogRef: MatDialogRef<AddMentorPopupComponent>,
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private userService: UserService,
    private regexService: RegexService,
    @Inject(MAT_DIALOG_DATA) public data: CompanyUser
  ) {
    this.mentorForm = this._formBuilder.group({
      last_name: [
        '',
        [
          Validators.required,
          Validators.pattern(this.regexService.stringValidator()),
        ],
      ],
      first_name: [
        '',
        [
          Validators.required,
          Validators.pattern(this.regexService.stringValidator()),
        ],
      ],
      mt_phone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern(this.regexService.phoneValidator()),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      role: 'MENTOR',
      mt_cmp_siret: data.company_siret,
      mt_job_title: [
        '',
        [
          Validators.required,
          Validators.pattern(this.regexService.stringValidator()),
        ],
      ],
      mt_last_diploma: ['', Validators.required],
      mt_former_eseo: ['', Validators.required],
    });
  }

  public addMentor(mentor: Mentor) {
    this.userService.add(mentor).subscribe({
      next: (v) => {
        this._snackBar.open('✔ Données des contacts enregistrées', 'Ok', {
          duration: 2000,
        });
        this.closeDialog();
      },
      error: (err) => {
        console.log(err);
        this._snackBar.open('❌ Une erreur est survenue', 'Ok', {
          duration: 2000,
        });
      },
    });
  }
  public closeDialog() {
    this.dialogRef.close({ event: 'close', data: this.fromDialog });
  }
}
