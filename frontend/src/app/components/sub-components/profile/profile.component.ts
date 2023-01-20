import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Apprentice } from '@app/models/Apprentice';
import { User } from '@app/models/User';
import { AuthService, UserService } from '@app/services';
import { ApprenticeService } from '@app/services/apprentice/apprentice.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input() apprenticeId;
  public apprentice!: Apprentice;

  constructor(
    private apprenticeSerivce: ApprenticeService,
  ) {
  }

  ngOnInit(): void {
    this.apprenticeSerivce.getById(this.apprenticeId).subscribe({
      next: (apprentice) => {
        this.apprentice = apprentice;
      },
    });
  }
}
