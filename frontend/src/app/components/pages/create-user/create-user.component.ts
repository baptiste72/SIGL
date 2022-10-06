import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/components/services/user.service';

@Component({
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  hide = true;
  register: any;

  constructor(private userService:UserService){}

  ngOnInit(): void {
    this.register = {
      last_name : '',
      first_name : '',
      password : '',
      email :''
    };
  }

  createUser(data:any){
    console.warn(data)
    this.userService.saveUser(data).subscribe((result)=>{
      console.warn(result)
    })
  }

  registerUser() {
    this.userService.registerUser(this.register);
    this.userService
      .getUsers()
      .subscribe((result: any[]) => {
        console.log(result);
      });
    console.log(this.register);
  }

}
