import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { YearGroupService } from 'src/app/services/year-group/year-group.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-promotion-popup',
  templateUrl: './add-promotion-popup.component.html',
  styleUrls: ['./add-promotion-popup.component.scss'],
})
export class AddPromotionPopupComponent implements OnInit {
  fromPage!: string;
  fromDialog!: string;
  register: any;

  constructor(
    public dialogRef: MatDialogRef<AddPromotionPopupComponent>,
    private yearGroupService: YearGroupService,
    private _snackBar: MatSnackBar,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any
  ) {}

  ngOnInit(): void {
    this.fromDialog = 'I am from dialog land...';
    this.register = {
      worded: '',
      beginDate: '',
    };
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close', data: this.fromDialog });
  }

  addPromotion(data: any) {
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
