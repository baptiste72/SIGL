import { Component, Inject, Input, OnInit } from '@angular/core';
import { YearGroupService } from 'src/app/services/year-group/year-group.service';
import { YearGroup } from 'src/app/models/YearGroup';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-year-group-popup',
  templateUrl: './update-year-group-popup.component.html',
  styleUrls: ['./update-year-group-popup.component.scss'],
})
export class UpdateYearGroupPopupComponent {
  fromPage!: string;
  fromDialog!: string;

  constructor(
    public dialogRef: MatDialogRef<UpdateYearGroupPopupComponent>,
    private yearGroupService: YearGroupService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: YearGroup
  ) {}

  closeDialog() {
    this.dialogRef.close({ event: 'close', data: this.fromDialog });
  }

  updatePromotion(data: any) {
    this.yearGroupService.updateYearGroup(data).subscribe({
      next: (v) => {
        this._snackBar.open('✔ Promotion modifiée', 'Ok', { duration: 2000 });
        this.closeDialog();
      },
      error: (err) => {
        this._snackBar.open('❌ Une erreur est survenue lors de la modificaiton de la promotion', 'Ok', {
          duration: 2000,
        });
      },
    });
  }
}
