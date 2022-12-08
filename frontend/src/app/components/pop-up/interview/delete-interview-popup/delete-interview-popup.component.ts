import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InterviewService } from 'src/app/services/interview/interview.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-delete-interview-popup',
  templateUrl: './delete-interview-popup.component.html',
  styleUrls: ['./delete-interview-popup.component.scss'],
})
export class DeleteInterviewPopupComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeleteInterviewPopupComponent>,
    private _snackBar: MatSnackBar,
    private interviewService: InterviewService
  ) {}

  public deleteInterview(id: any) {
    this.interviewService.deleteInterview(this.data.dataKey).subscribe({
      next: (v) => {
        this._snackBar.open('✔ interview supprimer', 'Ok', { duration: 2000 });
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
    this.dialogRef.close({ interview: 'close' });
  }
}
