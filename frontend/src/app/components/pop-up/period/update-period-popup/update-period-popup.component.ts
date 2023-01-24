import { Component, Inject, OnInit, Optional } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { PeriodService } from 'src/app/services/period/period.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { YearGroupService } from '@app/services/year-group/year-group.service';
import { ConfirmDeleteComponent } from '../../confirm-delete/confirm-delete.component';

interface inputperiods {
  name: string;
}

@Component({
  selector: 'app-update-period-popup',
  templateUrl: './update-period-popup.component.html',
  styleUrls: ['./update-period-popup.component.scss'],
})
export class UpdatePeriodPopupComponent implements OnInit {
  public js_period: any;
  public yearGroups: any;

  constructor(
    public dialogRef: MatDialogRef<UpdatePeriodPopupComponent>,
    private yearGroupService: YearGroupService,
    private periodService: PeriodService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private confirmDeleteDialogRef: MatDialogRef<ConfirmDeleteComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any
  ) {}

  type_periods: inputperiods[] = [
    { name: 'Rapport de synthèse S5' },
    { name: 'Rapport de synthèse S6' },
    { name: 'Rapport de synthèse S7' },
    { name: 'Rapport de synthèse S8' },
    { name: 'Rapport de synthèse S9' },
    { name: 'Rapport PING' },
  ];
  ngOnInit(): void {
    this.yearGroupService.getAll().subscribe((yearGroups) => {
      this.yearGroups = yearGroups;
    });
    this.js_period = this.mydata.dataKey;
    console.log(this.js_period);
  }

  public async openConfirmDeletePopup(content: string): Promise<boolean> {
    this.confirmDeleteDialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '600px',
    });

    this.confirmDeleteDialogRef.componentInstance.content = content;

    return await lastValueFrom(this.confirmDeleteDialogRef.afterClosed());
  }

  public async deleteperiodById(id: any) {
    const shouldDelete = await this.openConfirmDeletePopup(
      'Souhaitez-vous vraiment supprimer cette événement ?'
    );
    if (shouldDelete) {
      this.periodService.delete(id).subscribe({
        next: (v) => {
          this._snackBar.open('✔ Evénement supprimé', 'Ok', { duration: 2000 });
          this.closeDialog();
        },
        error: (err) => {
          this._snackBar.open(
            "❌ Une erreur est survenue lors de la suppression de l'événement",
            'Ok',
            { duration: 2000 }
          );
        },
      });
    }
  }

  public updateperiod(data: any) {
    let date = new Date(data.date);
    let formattedDate = date.toISOString();
    data.date = formattedDate;
    this.periodService.update(data, data.id).subscribe({
      next: (v) => {
        this._snackBar.open('✔ Evénement modifié', 'Ok', { duration: 2000 });
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
    this.dialogRef.close({ period: 'close', data: this.js_period });
  }
}
