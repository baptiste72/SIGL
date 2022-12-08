import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss'],
})
export class ConfirmDeleteComponent {
  public content: string = 'Voulez vous vraiment supprimer cet élément.';
  public title: string = 'Confirmation de suppression';

  constructor(public dialogRef: MatDialogRef<ConfirmDeleteComponent>) {}
}
