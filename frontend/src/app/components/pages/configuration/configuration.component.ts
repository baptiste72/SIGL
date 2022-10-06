import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddUserPopupComponent } from '../../pop-up/add-user-popup/add-user-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'surname', 'role', 'update'];
  dataSource = new MatTableDataSource<User>(ELEMENT_DATA);


  @ViewChild(MatPaginator) paginator :any = MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(public dialog: MatDialog) {}

  addUser() {
    this.dialog.open(AddUserPopupComponent,
      {
        width: '600px'
      }
    );
  }

  addPromotion() {

  }
}

export interface User {
  name: string;
  surname: string;
  role: string;
  update: string;
}

const ELEMENT_DATA: User[] = [
  {name: 'Mathilde', surname: 'RENAUD', role: 'Apprenti', update: './'},
  {name: 'Hugo', surname: 'TANNIOU', role: 'Apprenti', update: './'},
  {name: 'Joël', surname: 'HECKMANN', role: 'Apprenti', update: './'},
  {name: 'Tristan', surname: 'BAHUAUD', role: 'Apprenti', update: './'},
  {name: 'Thomas', surname: 'DHUICQ', role: 'Apprenti', update: './'}
];
