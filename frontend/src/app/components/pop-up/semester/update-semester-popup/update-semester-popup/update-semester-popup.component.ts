import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { YearGroupService } from 'src/app/services/year-group/year-group.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { YearGroup } from 'src/app/models/YearGroup';
import { SemesterService } from 'src/app/services/semester/semester.service';

@Component({
  selector: 'app-update-semester-popup',
  templateUrl: './update-semester-popup.component.html',
  styleUrls: ['./update-semester-popup.component.scss'],
})
export class UpdateSemesterPopupComponent implements OnInit {
  fromPage!: string;
  fromDialog!: string;
  promotions: YearGroup[]=[];

  constructor(
    public dialogRef: MatDialogRef<UpdateSemesterPopupComponent>,
    private yearGroupService: YearGroupService,
    private semesterService: SemesterService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.getYearGroup();
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close', data: this.fromDialog });
  }

  private getYearGroup() {
    this.yearGroupService.getYearGroup().subscribe({
      next: (promotionsData) => {
        this.promotions = promotionsData;
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
    this.semesterService.updateSemester(data).subscribe({
      next: (v) => {
        this._snackBar.open('✔ Semestre modifié', 'Ok', { duration: 2000 });
        this.closeDialog();
      },
      error: (err) => {
        this._snackBar.open('❌ Une erreur est survenue lors de la modification du semestre', 'Ok', {
          duration: 2000,
        });
      },
    });
  }
}
