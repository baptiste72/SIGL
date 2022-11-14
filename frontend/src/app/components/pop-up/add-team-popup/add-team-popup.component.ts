import { Component, Inject, OnInit, Optional, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-add-team-popup',
  templateUrl: './add-team-popup.component.html',
  styleUrls: ['./add-team-popup.component.scss']
})
export class AddTeamPopupComponent {
  fromPage!: string;
  fromDialog!: string;

  constructor(public dialogRef: MatDialogRef<AddTeamPopupComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any
    ) { }


  closeDialog() { this.dialogRef.close({ event: 'close', data: this.fromDialog }); }

  addTeam() {

  }

  apprentices: Apprentice[] = [{name: 'Mathilde RENAUD'},{name: 'Hugo TANNIOU'}];
  tutors: Tutor[] = [{name: 'Jérome ROQUEBERT'},{name: 'Jérome DELATOURE'}];
  masters: Master[] = [{name: 'Nicolas CAILLEAU'},{name: 'Jean DUJARDIN'}];
}

interface Apprentice {
  name: string;
}

interface Tutor {
  name: string;
}

interface Master {
  name: string;
}
