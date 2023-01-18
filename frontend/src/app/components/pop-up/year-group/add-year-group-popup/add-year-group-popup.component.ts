import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { YearGroupService } from 'src/app/services/year-group/year-group.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-year-group-popup',
  templateUrl: './add-year-group-popup.component.html',
  styleUrls: ['./add-year-group-popup.component.scss'],
})
export class AddYearGroupPopupComponent {
  public addYearGroupForm: FormGroup;
  public submitted: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddYearGroupPopupComponent>,
    private yearGroupService: YearGroupService,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {
    this.addYearGroupForm = this.formBuilder.group({
      worded: ['', Validators.required],
      beginDate: ['', Validators.required],
    });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close' });
  }

  public addPromotion() {
    this.submitted = true;
    if (this.addYearGroupForm.valid) {
      this.yearGroupService.add(this.addYearGroupForm.value).subscribe({
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
}
