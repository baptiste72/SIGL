import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeadlineService } from 'src/app/services/deadline/deadline.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@app/services/auth/auth.service';
import { YearGroupService } from '@app/services/year-group/year-group.service';

interface inputDeadlines {
  name: string;
}

@Component({
  selector: 'app-add-deadline-popup',
  templateUrl: './add-deadline-popup.component.html',
  styleUrls: ['./add-deadline-popup.component.scss'],
})
export class AddDeadlinePopupComponent implements OnInit {
  public js_deadline: any;
  public yearGroups: any;
  public type_deadlines: inputDeadlines[] = [
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
    private yearGroupService: YearGroupService,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any
  ) {}

  ngOnInit(): void {
    this.yearGroupService.getAll().subscribe((yearGroups) => {
      this.yearGroups = yearGroups;
    });
    this.js_deadline = {
      userId: this.getUserId(),
      name: '',
      date: this.mydata.date,
      description: '',
      yearGroup: '',
    };
  }

  private getUserId(): number {
    return this.authService.userValue.id;
  }

  public addDeadline(data: any) {
    this.deadlineService.add(data).subscribe({
      next: (v) => {
        this._snackBar.open('✔ Evénement créé', 'Ok', { duration: 2000 });
        this.dialogRef.close({ event: 'add', data: this.js_deadline });
      },
      error: (err) => {
        this._snackBar.open('❌ Une erreur est survenue', 'Ok', {
          duration: 2000,
        });
      },
    });
  }
  closeDialog() {
    this.dialogRef.close({ event: 'close', data: this.js_deadline });
  }
}
