import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Apprentice } from '@app/models/Apprentice';
import { ApprenticeService } from '@app/services/apprentice/apprentice.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnChanges {
  @Input() apprenticeId;
  public apprentice!: Apprentice;

  constructor(
    private apprenticeSerivce: ApprenticeService,
  ) {
  }

  ngOnInit(): void {
    this.getApprenticeById(this.apprenticeId);
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let change = changes[propName];
      this.getApprenticeById(change.currentValue);
    }
  }

  getApprenticeById(apprenticeId: number) {
    this.apprenticeSerivce.getById(this.apprenticeId).subscribe({
      next: (apprentice) => {
        this.apprentice = apprentice;
      },
    });
  }
}
