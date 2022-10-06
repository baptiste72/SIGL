import { Component, Inject, OnInit, Optional, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';

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
    private authService: AuthService, 
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

  closeDialog() {
    this.dialogRef.close({ event: 'close', data: this.fromDialog });
  }

  public addUser(data: any) {
    console.log(data)
    // FIXME: à corriger
     this.authService.register(data).subscribe((result) => {
       console.warn(result)
     })     
}


  promotions: Promotion[] = [{name: 'Noether'},{name: 'Promotion2'},{name: 'Promotion3'}];
  roles: Role[] = [{name: 'Apprenti'},{name: 'Maître apprentissage'},{name: 'Tuteur pédagogique'}];
}
