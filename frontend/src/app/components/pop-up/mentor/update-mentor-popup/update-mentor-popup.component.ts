import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mentor } from '@app/models/Mentor';
import { UserService } from '@app/services';
import { RegexService } from '@app/services/regex/regex.service';

@Component({
  selector: 'app-update-mentor-popup',
  templateUrl: './update-mentor-popup.component.html',
  styleUrls: ['./update-mentor-popup.component.scss'],
})
export class UpdateMentorPopupComponent {
  public mentorForm: FormGroup;
  public isFormerESEO: string[] = ['Oui', 'Non'];

  constructor(
    public dialogRef: MatDialogRef<UpdateMentorPopupComponent>,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private regexService: RegexService,
    @Inject(MAT_DIALOG_DATA) public data: Mentor
  ) {
    this.mentorForm = this._formBuilder.group({
      id: data.id,
      last_name: [
        data.last_name,
        [
          Validators.required,
          Validators.pattern(this.regexService.stringValidator()),
        ],
      ],
      first_name: [
        data.first_name,
        [
          Validators.required,
          Validators.pattern(this.regexService.stringValidator()),
        ],
      ],
      mt_phone: [
        data.mt_phone,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern(this.regexService.phoneValidator()),
        ],
      ],
      email: [data.email, [Validators.required, Validators.email]],
      role: 'MENTOR',
      mt_cmp_siret: [
        data.mt_cmp_siret,
        Validators.pattern(this.regexService.numberOnlyValidator()),
      ],
      mt_job_title: [
        data.mt_job_title,
        [
          Validators.required,
          Validators.pattern(this.regexService.stringValidator()),
        ],
      ],
      mt_last_diploma: [data.mt_last_diploma, Validators.required],
      mt_former_eseo: [data.mt_former_eseo, Validators.required],
    });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close' });
  }

  updateMentor(data: any) {
    this.userService.update(data).subscribe({
      next: (v) => {
        this._snackBar.open('✔ Données apprenti modifiées', 'Ok', {
          duration: 2000,
        });
        this.closeDialog();
      },
      error: (err) => {
        console.log(err);
        this._snackBar.open(
          '❌ Une erreur est survenue lors de la modificaiton des données',
          'Ok',
          { duration: 2000 }
        );
      },
    });
  }
}
