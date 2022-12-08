import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeadlineService } from 'src/app/services/deadline/deadline.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Semester {
  name: string;
}
interface Guest {
  name: string;
}
interface deadlines {
  name: string;
}

@Component({
  selector: 'app-modify-deadline-popup',
  templateUrl: './modify-deadline-popup.component.html',
  styleUrls: ['./modify-deadline-popup.component.scss'],
})
export class ModifyDeadlinePopupComponent implements OnInit {
  js_deadline: any;

  constructor(
    public dialogRef: MatDialogRef<ModifyDeadlinePopupComponent>,
    private deadlineService: DeadlineService,
    private _snackBar: MatSnackBar,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any
  ) {}

  fromDialog!: string;
  type_deadlines: deadlines[] = [
    { name: 'Rapport de synthèse S5' },
    { name: 'Rapport de synthèse S6' },
    { name: 'Rapport de synthèse S7' },
    { name: 'Rapport de synthèse S8' },
    { name: 'Rapport de synthèse S9' },
    { name: 'Rapport Ping' },
  ];
  ngOnInit(): void {
    this.fromDialog = '';
    this.js_deadline = this.mydata.dataKey;
  }

  public updateDeadline(data: any) {
    this.deadlineService.updateDeadline(data).subscribe({
      next: (v) => {
        this._snackBar.open('✔ Evénement créé', 'Ok', { duration: 2000 });
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
    this.dialogRef.close({ deadline: 'close', data: this.fromDialog });
  }
}
