import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeadlineService } from 'src/app/services/deadline/deadline.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@app/services/auth/auth.service';

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
    private authService: AuthService,
    public dialogRef: MatDialogRef<AddDeadlinePopupComponent>,
    private deadlineService: DeadlineService,
    private _snackBar: MatSnackBar,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any
  ) {}

  fromDialog!: string;

  ngOnInit(): void {
    this.fromDialog = '';
    this.js_deadline = {
      userId: this.getUserId(),
      name: '',
      date: '',
      description: '',
    };
  }

  private getUserId(): number {
    return this.authService.userValue.id;
  }

  public addDeadline(data: any) {
    this.deadlineService.add(data).subscribe({
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
