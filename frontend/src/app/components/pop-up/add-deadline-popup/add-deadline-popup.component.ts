import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeadlineService } from 'src/app/services/deadline/deadline.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface deadlines {
  name: string;
}

@Component({
  selector: 'app-add-deadline-popup',
  templateUrl: './add-deadline-popup.component.html',
  styleUrls: ['./add-deadline-popup.component.scss'],
})
export class AddDeadlinePopupComponent implements OnInit {
  js_deadline: any;
  type_deadlines: deadlines[] = [
    { name: 'Rapport de synthèse S5' },
    { name: 'Rapport de synthèse S6' },
    { name: 'Rapport de synthèse S7' },
    { name: 'Rapport de synthèse S8' },
    { name: 'Rapport de synthèse S9' },
    { name: 'Rapport Ping' },
  ];

  constructor(
    public dialogRef: MatDialogRef<AddDeadlinePopupComponent>,
    private deadlineService: DeadlineService,
    private _snackBar: MatSnackBar,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any
  ) {}

  fromDialog!: string;

  DateSchedule = new Date();
  Datetest = new Date(500000000000);
  ngOnInit(): void {
    this.fromDialog = 'I am from dialog land...';
    this.js_deadline = {
      name: '',
      date: '',
      description: '',
    };
  }

  public addDeadline(data: any) {
    this.deadlineService.addDeadline(data).subscribe({
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
    this.dialogRef.close({ event: 'close', data: this.fromDialog });
  }
}
