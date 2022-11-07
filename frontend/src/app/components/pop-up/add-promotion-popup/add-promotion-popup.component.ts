import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-promotion-popup',
  templateUrl: './add-promotion-popup.component.html',
  styleUrls: ['./add-promotion-popup.component.scss']
})
export class AddPromotionPopupComponent implements OnInit {
  fromPage!: string;
  fromDialog!: string;

  constructor(public dialogRef: MatDialogRef<AddPromotionPopupComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any
    ) { }

  ngOnInit(): void {
    this.fromDialog = "I am from dialog land...";
  }

  closeDialog() { this.dialogRef.close({ event: 'close', data: this.fromDialog }); }
  addPromotion() {

  }
}
