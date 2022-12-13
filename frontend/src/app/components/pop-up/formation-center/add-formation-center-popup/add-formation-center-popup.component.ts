import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormationCenterService } from 'src/app/services/formation-center/formation-center.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormationCenter } from '@app/models/FormationCenter';

@Component({
  selector: 'app-add-formation-center-popup',
  templateUrl: './add-formation-center-popup.component.html',
  styleUrls: ['./add-formation-center-popup.component.scss']
})
export class AddFormationCenterPopupComponent implements OnInit {
  register: any;

  constructor(
    public dialogRef: MatDialogRef<AddFormationCenterPopupComponent>,
    private formationCenterService: FormationCenterService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.register = {
      worded: '',
      city: '',
      postal_code: '',
      address: '',
    };
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close' });
  }

  public addFormationCenter(formation_center: FormationCenter) {
    this.formationCenterService.add(formation_center).subscribe({
      next: (v) => {
        this._snackBar.open('✔ Centre de formation ajouté', 'Ok', { duration: 2000 });
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
