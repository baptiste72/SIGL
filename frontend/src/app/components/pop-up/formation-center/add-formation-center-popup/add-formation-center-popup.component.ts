import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormationCenterService } from 'src/app/services/formation-center/formation-center.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormationCenter } from '@app/models/FormationCenter';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-formation-center-popup',
  templateUrl: './add-formation-center-popup.component.html',
  styleUrls: ['./add-formation-center-popup.component.scss'],
})
export class AddFormationCenterPopupComponent {
  public addFormationCenterForm: FormGroup;
  public submitted: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddFormationCenterPopupComponent>,
    private formationCenterService: FormationCenterService,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {
    this.addFormationCenterForm = this.formBuilder.group({
      worded: ['', Validators.required],
      city: ['', Validators.required],
      postal_code: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close' });
  }

  public addFormationCenter() {
    this.submitted = true;
    if (this.addFormationCenterForm.valid) {
      this.formationCenterService.add(this.addFormationCenterForm.value).subscribe({
        next: (v) => {
          this._snackBar.open('✔ Centre de formation ajouté', 'Ok', {
            duration: 2000,
          });
          this.closeDialog();
        },
        error: (err) => {
          this._snackBar.open('❌ Une erreur est survenue', 'Ok', {
            duration: 2000,
          });
        },
      });
    }
  }
}
