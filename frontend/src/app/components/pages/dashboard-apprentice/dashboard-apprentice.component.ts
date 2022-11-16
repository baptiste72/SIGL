import { Component, OnInit} from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  templateUrl: './dashboard-apprentice.component.html',
  styleUrls: ['./dashboard-apprentice.component.scss']
})
export class DashboardApprenticeComponent implements OnInit {
  public user: User;

  constructor(private authService: AuthService) {
    this.user = new User(0, "John", "Doe", "")
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe((user) => {
      this.user = user;
    });
  }

}
