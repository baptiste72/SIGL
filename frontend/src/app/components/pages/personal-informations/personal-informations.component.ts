import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  templateUrl: './personal-informations.component.html',
  styleUrls: ['./personal-informations.component.scss']
})
export class PersonalInformationsComponent implements OnInit {
  public user: User;

  constructor() {
    this.user = new User("", "", "", "");
  }

  public ngOnInit(): void {
    const userJson = sessionStorage.getItem("user");
    if (userJson !== null) {
      this.user = JSON.parse(userJson);
    }
  }

}
