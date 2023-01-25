import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApprenticeInfoService } from '@app/services/apprentice-info/apprentice-info.service';
import { ApprenticeInfo } from '@app/models/ApprenticeInfo';
import { CompanyUser } from '@app/models/CompanyUser';
import { RegexService } from '@app/services/regex/regex.service';

@Component({
  selector: 'app-add-apprentice-popup',
  templateUrl: './add-apprentice-popup.component.html',
  styleUrls: ['./add-apprentice-popup.component.scss'],
})
export class AddApprenticeInfoPopupComponent {
  public apprenticeForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddApprenticeInfoPopupComponent>,
    private apprenticeInfoService: ApprenticeInfoService,
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private regexService: RegexService,
    @Inject(MAT_DIALOG_DATA) public data: CompanyUser
  ) {
    this.apprenticeForm = this._formBuilder.group({
      app_last_name: [
        '',
        [
          Validators.required,
          Validators.pattern(this.regexService.stringValidator()),
        ],
      ],
      app_first_name: [
        '',
        [
          Validators.required,
          Validators.pattern(this.regexService.stringValidator()),
        ],
      ],
      app_job_title: [
        '',
        [
          Validators.required,
          Validators.pattern(this.regexService.stringValidator()),
        ],
      ],
      app_description: ['', Validators.required],
      app_phone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern(this.regexService.phoneValidator()),
        ],
      ],
      app_collective_convention: ['', Validators.required],
      app_working_hours: [
        '',
        [
          Validators.required,
          Validators.pattern(this.regexService.numberOnlyValidator()),
        ],
      ],
      app_comp_name: [null],
      app_siret: [
        data.company_siret,
        [
          Validators.required,
          Validators.pattern(this.regexService.numberOnlyValidator()),
        ],
      ],
      app_location: [null],
    });
  }

  public addApprentice(data: ApprenticeInfo) {
    this.apprenticeInfoService.add(data).subscribe({
      next: (v) => {
        this._snackBar.open("✔ Données de l'apprenti enregistrées ");
        this.closeDialog();
      },
      error: (err) => {
        console.log(err);
        this._snackBar.open('❌ Une erreur est survenue');
      },
    });
  }
  public closeDialog() {
    this.dialogRef.close({ event: 'close' });
  }
}
