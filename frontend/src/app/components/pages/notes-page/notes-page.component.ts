import { Component } from '@angular/core';
import { User } from '@app/models/User';
import { AuthService } from '@app/services';


@Component({
  templateUrl: './notes-page.component.html',
  styleUrls: ['./notes-page.component.scss'],
})
export class NotesPageComponent {
  public user: User;
  public apprenticeId ='';

  constructor(private authService: AuthService) {
    this.user = this.authService.userValue;
    this.apprenticeId = this.user.id.toString();
  }

  onApprenticeChanged(id: string) {
    this.apprenticeId = id;
  }
}
