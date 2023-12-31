import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormationCenterService } from 'src/app/services/formation-center/formation-center.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormationCenter } from 'src/app/models/FormationCenter';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-formation-center-popup',
  templateUrl: './update-formation-center-popup.component.html',
  styleUrls: ['./update-formation-center-popup.component.scss'],
})
export class UpdateFormationCenterPopupComponent {
  public updateFormationCenterForm: FormGroup;
  public submitted: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<UpdateFormationCenterPopupComponent>,
    private formationCenterService: FormationCenterService,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: FormationCenter
  ) {
    this.updateFormationCenterForm = this.formBuilder.group({
      worded: [this.data.worded, Validators.required],
      city: [this.data.city, Validators.required],
      postal_code: [this.data.postal_code, Validators.required],
      address: [this.data.address, Validators.required],
    });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close' });
  }

  updateFormationCenter() {
    this.submitted = true;
    if (this.updateFormationCenterForm.valid) {
      this.formationCenterService
        .update(this.updateFormationCenterForm.value, this.data.id)
        .subscribe({
          next: (v) => {
            this._snackBar.open('✔ Centre de formation modifiée', 'Ok', {
              duration: 2000,
            });
            this.closeDialog();
          },
          error: (err) => {
            this._snackBar.open(
              '❌ Une erreur est survenue lors de la modificaiton du centre de formation',
              'Ok',
              {
                duration: 2000,
              }
            );
          },
        });
    }
  }
}
