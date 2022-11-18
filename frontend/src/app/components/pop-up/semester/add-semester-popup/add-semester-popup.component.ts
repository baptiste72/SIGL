import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { YearGroupService } from 'src/app/services/year-group/year-group.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { YearGroup } from 'src/app/models/YearGroup';
import { SemesterService } from 'src/app/services/semester/semester.service';

@Component({
  selector: 'app-add-semester-popup',
  templateUrl: './add-semester-popup.component.html',
  styleUrls: ['./add-semester-popup.component.scss'],
})
export class AddSemesterPopupComponent implements OnInit {
  fromPage!: string;
  fromDialog!: string;
  promotions: YearGroup[]=[];
  register: any;

  constructor(
    public dialogRef: MatDialogRef<AddSemesterPopupComponent>,
    private yearGroupService: YearGroupService,
    private semesterService: SemesterService,
    private _snackBar: MatSnackBar,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any
  ) {}

  ngOnInit(): void {
    this.getYearGroup();
    this.register = {
      name: '',
      beginDate: '',
      endDate: '',
      yearGroup: '',
    };
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

  addSemester(data: any) {
    this.semesterService.addSemester(data).subscribe({
      next: (v) => {
        this._snackBar.open('✔ Semestre ajoutée', 'Ok', { duration: 2000 });
        this.closeDialog();
      },
      error: (err) => {
        this._snackBar.open('❌ Une erreur est survenue lors de l ajout du semestre', 'Ok', {
          duration: 2000,
        });
      },
    });
  }
}
