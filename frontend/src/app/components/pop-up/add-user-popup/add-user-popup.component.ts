import { Component, Inject, OnInit, Optional, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { UserService } from 'src/app/components/services/user.service';

interface Promotion {
  name: string;
}

interface Role {
  name: string;
}

@Component({
  selector: 'app-add-user-popup',
  templateUrl: './add-user-popup.component.html',
  styleUrls: ['./add-user-popup.component.scss']
})
export class AddUserPopupComponent implements OnInit {
  fromPage!: string;
  fromDialog!: string;
  selectedRole = '';
  register: any;

  constructor(public dialogRef: MatDialogRef<AddUserPopupComponent>,
    private userService:UserService,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any
    ) { }

  ngOnInit(): void {
    this.fromDialog = "I am from dialog land...";
    this.register = {
      last_name : '',
      first_name : '',
      password : '',
      email :''
    };

  }

  closeDialog() { this.dialogRef.close({ event: 'close', data: this.fromDialog }); }

  addUser(data:any){
  console.warn(data)
  this.userService.saveUser(data).subscribe((result)=>{
    console.warn(result)
  })
}


  promotions: Promotion[] = [{name: 'Noether'},{name: 'Promotion2'},{name: 'Promotion3'}];
  roles: Role[] = [{name: 'Apprenti'},{name: 'Maître apprentissage'},{name: 'Tuteur pédagogique'}];
}
