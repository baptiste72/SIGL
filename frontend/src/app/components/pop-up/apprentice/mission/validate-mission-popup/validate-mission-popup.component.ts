import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApprenticeInfo } from '@app/models/ApprenticeInfo';
import { ApprenticeInfoService } from '@app/services/apprentice-info/apprentice-info.service';

@Component({
  selector: 'app-validate-mission-popup',
  templateUrl: './validate-mission-popup.component.html',
  styleUrls: ['./validate-mission-popup.component.scss'],
})
export class ValidateMissionPopupComponent {
  public isAccepted: boolean = false;
  public btnArePristine: boolean = true;
  public comment: string = '';

  constructor(
    public dialogRef: MatDialogRef<ValidateMissionPopupComponent>,
    private _snackBar: MatSnackBar,
    private missionService: ApprenticeInfoService,
    @Inject(MAT_DIALOG_DATA) public data: ApprenticeInfo
  ) {}

  public changeStatus(status: boolean) {
    this.isAccepted = status;
    this.btnArePristine = false;
  }

  public submitValidation(event: any, comment: string) {
    this.data.app_is_validate = event.submitter.name == 'accept';
    this.missionService.validateMission(this.data, comment).subscribe({
      next: (v) => {
        this.displaySnackBar("✔ Statut d'acceptation bien envoyé");
        this.dialogRef.close({ event: 'close' });
      },
      error: (err) => {
        this.displaySnackBar('❌ Une erreur est survenue');
      },
    });
  }

  private displaySnackBar(msg: string) {
    this._snackBar.open(msg, 'Ok', { duration: 2000 });
  }
}
