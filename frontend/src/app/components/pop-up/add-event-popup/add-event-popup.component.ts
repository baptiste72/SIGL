import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InterviewService } from 'src/app/services/interview/interview.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Semester {
  name: string;
}
interface Guest {
  name: string;
}

@Component({
  selector: 'app-add-event-popup',
  templateUrl: './add-event-popup.component.html',
  styleUrls: ['./add-event-popup.component.scss'],
})
export class AddEventPopupComponent implements OnInit {
  interview: any;
  semesters: Semester[] = [
    { name: 'Semestre S5' },
    { name: 'Semestre S6' },
    { name: 'Semestre S7' },
    { name: 'Semestre S8' },
    { name: 'Semestre S9' },
  ];
  guests: Guest[] = [
    { name: 'Equipe tutorale' },
    { name: "Maitre d'apprentissage" },
    { name: 'tuteur pédaogique' },
  ];

  constructor(
    public dialogRef: MatDialogRef<AddEventPopupComponent>,
    private interviewService: InterviewService,
    private _snackBar: MatSnackBar,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any
  ) {}

  fromDialog!: string;

  ngOnInit(): void {
    this.fromDialog = 'I am from dialog land...';
    this.interview = {
      name: '',
      date: '',
      first_hour: '',
      last_hour: '',
      description: '',
      semester: ' ',
    };
  }
  public addinterview(data: any) {
    this.interviewService.addinterview(data).subscribe({
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
