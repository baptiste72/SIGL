import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


interface Semester {
  name: string;
}

interface Guest {
  name: string;
}


@Component({
  selector: 'app-add-event-popup',
  templateUrl: './add-event-popup.component.html',
  styleUrls: ['./add-event-popup.component.scss']
})
export class AddEventPopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddEventPopupComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any) { }

  fromDialog!: string;

  ngOnInit(): void {
    this.fromDialog = "I am from dialog land...";

  }

  closeDialog() { this.dialogRef.close({ event: 'close', data: this.fromDialog }); }

  semesters: Semester[] = [{name: 'Semestre S5'},{name: 'Semestre S6'},{name: 'Semestre S7'},{name: 'Semestre S8'},{name: 'Semestre S9'}];
  guests: Guest[] = [{name: 'Equipe tutorale'},{name: 'Maitre d\'apprentissage'},{name: 'tuteur pédaogique'}];

}
