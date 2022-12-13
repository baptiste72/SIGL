import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormationCenterService } from 'src/app/services/formation-center/formation-center.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormationCenter } from 'src/app/models/FormationCenter';

@Component({
  selector: 'app-update-formation-center-popup',
  templateUrl: './update-formation-center-popup.component.html',
  styleUrls: ['./update-formation-center-popup.component.scss']
})
export class UpdateFormationCenterPopupComponent {
  constructor(
    public dialogRef: MatDialogRef<UpdateFormationCenterPopupComponent>,
    private formationCenterService: FormationCenterService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: FormationCenter
  ) {}

  closeDialog() {
    this.dialogRef.close({ event: 'close' });
  }

  updateFormationCenter(formation_center: FormationCenter) {
    this.formationCenterService.update(formation_center).subscribe({
      next: (v) => {
        this._snackBar.open('✔ Centre de formation modifiée', 'Ok', { duration: 2000 });
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
