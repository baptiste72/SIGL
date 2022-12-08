import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeadlineService } from 'src/app/services/deadline/deadline.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-delete-deadline-popup',
  templateUrl: './delete-deadline-popup.component.html',
  styleUrls: ['./delete-deadline-popup.component.scss'],
})
export class DeleteDeadlinePopupComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeleteDeadlinePopupComponent>,
    private _snackBar: MatSnackBar,
    private deadlineService: DeadlineService
  ) {}

  public deleteDeadline(id: any) {
    this.deadlineService.deleteDeadline(this.data.dataKey).subscribe({
      next: (v) => {
        this._snackBar.open('✔ deadline supprimer', 'Ok', { duration: 2000 });
        this.closeDialog();
      },
      error: (err) => {
        this._snackBar.open('❌ Une erreur est survenue', 'Ok', {
          duration: 2000,
        });
      },
    });
  }

  closeDialog() {
    this.dialogRef.close({ deadline: 'close' });
  }
}
