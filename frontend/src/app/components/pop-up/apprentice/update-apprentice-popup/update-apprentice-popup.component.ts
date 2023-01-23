import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { ApprenticeInfo } from '@app/models/ApprenticeInfo';
import { ApprenticeInfoService } from '@app/services/apprentice-info/apprentice-info.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegexService } from '@app/services/regex/regex.service';

@Component({
  selector: 'app-update-user-popup',
  templateUrl: './update-apprentice-popup.component.html',
  styleUrls: ['./update-apprentice-popup.component.scss'],
})
export class UpdateApprenticeInfoPopupComponent {
  public apprenticeForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UpdateApprenticeInfoPopupComponent>,
    private apprenticeInfoService: ApprenticeInfoService,
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private regexService: RegexService,
    @Inject(MAT_DIALOG_DATA) public data: ApprenticeInfo
  ) {
    this.apprenticeForm = this._formBuilder.group({
      id: data.id,
      app_last_name: [
        data.app_last_name,
        [
          Validators.required,
          Validators.pattern(this.regexService.stringValidator()),
        ],
      ],
      app_first_name: [
        data.app_first_name,
        [
          Validators.required,
          Validators.pattern(this.regexService.stringValidator()),
        ],
      ],
      app_job_title: [
        data.app_job_title,
        [
          Validators.required,
          Validators.pattern(this.regexService.stringValidator()),
        ],
      ],
      app_description: ['oui', Validators.required],
      app_phone: [
        data.app_phone,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern(this.regexService.phoneValidator()),
        ],
      ],
      app_collective_convention: [
        data.app_collective_convention,
        Validators.required,
      ],
      app_working_hours: [
        data.app_working_hours,
        [
          Validators.required,
          Validators.pattern(this.regexService.numberOnlyValidator()),
        ],
      ],
      app_comp_name: [data.app_comp_name],
      app_siret: [
        data.app_siret,
        [
          Validators.required,
          Validators.pattern(this.regexService.numberOnlyValidator()),
        ],
      ],
      app_location: [data.app_location],
    });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close' });
  }

  updateApprentice(data: any) {
    this.apprenticeInfoService.update(data).subscribe({
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
