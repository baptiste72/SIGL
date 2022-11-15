import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  showFiller = true;
  opened: boolean = true;

  @Input() user: User;

  constructor(private authService: AuthService, private router: Router) {
    this.user = new User(2,"Mathilde", "RENAUD", "")
  }

  ngOnInit(): void {
  }

  public logout() {
    this.authService.logout().subscribe(data => {
      this.router.navigate(['login'])
    });
  }

}
