import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
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
  yearGroups: YearGroup[] = [];
  register: any;

  semesters: Semester[] = [
    { name: 'Semestre S5' },
    { name: 'Semestre S6' },
    { name: 'Semestre S7' },
    { name: 'Semestre S8' },
    { name: 'Semestre S9' },
  ];

  constructor(
    public dialogRef: MatDialogRef<AddSemesterPopupComponent>,
    private yearGroupService: YearGroupService,
    private semesterService: SemesterService,
    private _snackBar: MatSnackBar
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

  addSemester(data: any) {
    this.semesterService.add(data).subscribe({
      next: (v) => {
        this._snackBar.open('✔ Semestre ajoutée', 'Ok', { duration: 2000 });
        this.closeDialog();
      },
      error: (err) => {
        this._snackBar.open(
          "❌ Une erreur est survenue lors de l'ajout du semestre",
          'Ok',
          {
            duration: 2000,
          }
        );
      },
    });
  }
}
