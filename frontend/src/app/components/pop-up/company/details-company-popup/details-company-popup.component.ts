import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Company } from '@app/models/Company';

@Component({
  selector: 'app-details-company-popup',
  templateUrl: './details-company-popup.component.html',
  styleUrls: ['./details-company-popup.component.scss'],
})
export class DetailsCompanyPopupComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Company) {}
}
