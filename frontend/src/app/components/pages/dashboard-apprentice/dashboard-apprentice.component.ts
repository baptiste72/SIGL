import { Component } from '@angular/core';

@Component({
  templateUrl: './dashboard-apprentice.component.html',
  styleUrls: ['./dashboard-apprentice.component.scss']
})
export class DashboardApprenticeComponent implements OnInit {
  public user: User;

  constructor(private authService: AuthService) {
    this.user = new User(1, "Mathilde", "RENAUD", "")
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe((user) => {
      this.user = user;
    });
  }

}
