import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { YearGroupService } from 'src/app/services/year-group/year-group.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-year-group-popup',
  templateUrl: './add-year-group-popup.component.html',
  styleUrls: ['./add-year-group-popup.component.scss'],
})
export class AddYearGroupPopupComponent implements OnInit {
  register: any;

  constructor(
    public dialogRef: MatDialogRef<AddYearGroupPopupComponent>,
    private yearGroupService: YearGroupService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.register = {
      worded: '',
      beginDate: '',
    };
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close' });
  }

  public addPromotion(data: any) {
    this.yearGroupService.addYearGroup(data).subscribe({
      next: (v) => {
        this._snackBar.open('✔ Promotion ajoutée', 'Ok', { duration: 2000 });
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
