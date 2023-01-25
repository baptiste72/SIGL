import { Component } from "@angular/core";
import { User } from "@app/models/User";
import { AuthService } from "@app/services";

@Component({

  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss'],
})
export class EventsPageComponent {
  public user: User;
  public apprenticeId ='';

  constructor(private authService: AuthService) {
    this.user = this.authService.userValue;
    this.apprenticeId = this.user.id.toString();
  }
}
