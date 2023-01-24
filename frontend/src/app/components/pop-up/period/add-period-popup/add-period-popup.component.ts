import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PeriodService } from 'src/app/services/period/period.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@app/services/auth/auth.service';
import { YearGroupService } from '@app/services/year-group/year-group.service';

interface inputperiods {
  name: string;
}

@Component({
  selector: 'app-add-period-popup',
  templateUrl: './add-period-popup.component.html',
  styleUrls: ['./add-period-popup.component.scss'],
})
export class AddPeriodPopupComponent implements OnInit {
  public js_period: any;
  public yearGroups: any;
  public type_periods: inputperiods[] = [
    { name: 'Entretien semestriel S5' },
    { name: 'Entretien semestriel S6' },
    { name: 'Entretien semestriel S7' },
    { name: 'Entretien semestriel S8' },
    { name: 'Entretien semestriel S9' },
    { name: 'Entretien semestriel Ping' },
    { name: 'Période entreprise' },
    { name: 'Période école' },
  ];

  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<AddPeriodPopupComponent>,
    private periodService: PeriodService,
    private _snackBar: MatSnackBar,
    private yearGroupService: YearGroupService,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any
  ) {}

  ngOnInit(): void {
    this.yearGroupService.getAll().subscribe((yearGroups) => {
      this.yearGroups = yearGroups;
    });
    this.js_period = {
      userId: this.getUserId(),
      name: '',
      start_date: new Date(),
      end_date: new Date(),
      description: '',
      yearGroup: '',
    };
  }

  private getUserId(): number {
    return this.authService.userValue.id;
  }

  public addperiod(data: any) {
    this.periodService.add(data).subscribe({
      next: (v) => {
        this._snackBar.open('✔ Evénement créé', 'Ok', { duration: 2000 });
        this.dialogRef.close({ event: 'add', data: this.js_period });
      },
      error: (err) => {
        this._snackBar.open('❌ Une erreur est survenue', 'Ok', {
          duration: 2000,
        });
      },
    });
  }
  closeDialog() {
    this.dialogRef.close({ event: 'close', data: this.js_period });
  }
}
