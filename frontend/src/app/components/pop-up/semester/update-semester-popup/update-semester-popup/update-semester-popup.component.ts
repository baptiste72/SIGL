import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { YearGroupService } from 'src/app/services/year-group/year-group.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { YearGroup } from 'src/app/models/YearGroup';
import { SemesterService } from 'src/app/services/semester/semester.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-semester-popup',
  templateUrl: './update-semester-popup.component.html',
  styleUrls: ['./update-semester-popup.component.scss'],
})
export class UpdateSemesterPopupComponent implements OnInit {
  yearGroups: YearGroup[] = [];
  public updateSemesterForm: FormGroup;
  submitted: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<UpdateSemesterPopupComponent>,
    private yearGroupService: YearGroupService,
    private semesterService: SemesterService,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.updateSemesterForm = this.formBuilder.group({
      name: ['', Validators.required],
      beginDate: ['', Validators.required],
      endDate: ['', Validators.required],
      yearGroup: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getYearGroup();
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close' });
  }

  private getYearGroup() {
    this.yearGroupService.getAll().subscribe({
      next: (yearGroupsData) => {
        this.yearGroups = yearGroupsData;
      },
      error: (err) => {
        this._snackBar.open(
          '❌ Une erreur est survenue lors de la récupération des promotions',
          'Ok',
          {
            duration: 2000,
          }
        );
      },
    });
  }

  updateSemester(data: any) {
    this.submitted = true;
    if (this.updateSemesterForm.valid) {
    this.semesterService.update(data).subscribe({
      next: (v) => {
        this._snackBar.open('✔ Semestre modifié', 'Ok', { duration: 2000 });
        this.closeDialog();
      },
      error: (err) => {
        this._snackBar.open(
          '❌ Une erreur est survenue lors de la modification du semestre',
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
