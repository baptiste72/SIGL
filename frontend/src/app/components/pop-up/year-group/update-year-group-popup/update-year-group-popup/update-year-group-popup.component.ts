import { Component, Inject } from '@angular/core';
import { YearGroupService } from 'src/app/services/year-group/year-group.service';
import { YearGroup } from 'src/app/models/YearGroup';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-year-group-popup',
  templateUrl: './update-year-group-popup.component.html',
  styleUrls: ['./update-year-group-popup.component.scss'],
})
export class UpdateYearGroupPopupComponent {
  public updateYearGroupForm: FormGroup;
  public submitted: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<UpdateYearGroupPopupComponent>,
    private yearGroupService: YearGroupService,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: YearGroup
  ) {
    this.updateYearGroupForm = this.formBuilder.group({
      worded: [this.data.worded, Validators.required],
      beginDate: [this.data.beginDate, Validators.required],
    });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close' });
  }

  updatePromotion() {
    this.submitted = true;
    if (this.updateYearGroupForm.valid) {
      this.yearGroupService.update(this.updateYearGroupForm.value).subscribe({
        next: (v) => {
          this._snackBar.open('✔ Promotion modifiée', 'Ok', { duration: 2000 });
          this.closeDialog();
        },
        error: (err) => {
          this._snackBar.open(
            '❌ Une erreur est survenue lors de la modificaiton de la promotion',
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
