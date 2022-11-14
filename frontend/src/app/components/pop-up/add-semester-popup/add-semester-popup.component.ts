import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-add-semester-popup',
  templateUrl: './add-semester-popup.component.html',
  styleUrls: ['./add-semester-popup.component.scss']
})
export class AddSemesterPopupComponent implements OnInit {
  fromPage!: string;
  fromDialog!: string;

  constructor(public dialogRef: MatDialogRef<AddSemesterPopupComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any
    ) { }

    ngOnInit(): void {
      this.fromDialog = "I am from dialog land...";
    }

    closeDialog() { this.dialogRef.close({ event: 'close', data: this.fromDialog }); }
    addSemester() {

    }

    promotions: Promotion[] = [{name: 'Noether', beginDate: new Date('1/1/16')}];
  }

interface Promotion {
  name: string;
  beginDate: Date;
}
