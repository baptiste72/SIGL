import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddUserPopupComponent } from '../../pop-up/add-user-popup/add-user-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { AddPromotionPopupComponent } from '../../pop-up/add-promotion-popup/add-promotion-popup.component';
import { AddTeamPopupComponent } from '../../pop-up/add-team-popup/add-team-popup.component';

@Component({
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements AfterViewInit {
  displayedColumnsUsers: string[] = ['name', 'surname', 'role', 'update'];
  dataSourceUsers = new MatTableDataSource<User>(USERS_DATA);

  displayedColumnsTeams: string[] = ['apprentice', 'tutor', 'master', 'update'];
  dataSourceTeams = new MatTableDataSource<Team>(TEAMS_DATA);

  @ViewChild(MatPaginator) paginator :any = MatPaginator;
  @ViewChild(MatPaginator) paginator2 :any = MatPaginator;

  ngAfterViewInit() {
    this.dataSourceUsers.paginator = this.paginator;
    this.dataSourceTeams.paginator = this.paginator2;
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
    this.dialog.open(AddPromotionPopupComponent,
      {
        width: '600px'
      }
    );
  }

  addTeam() {
    this.dialog.open(AddTeamPopupComponent,
      {
        width: '600px'
      }
    );
  }
}

export interface User {
  name: string;
  surname: string;
  role: string;
  update: string;
}

const USERS_DATA: User[] = [
  {name: 'Mathilde', surname: 'RENAUD', role: 'Apprenti', update: './'},
  {name: 'Hugo', surname: 'TANNIOU', role: 'Apprenti', update: './'},
  {name: 'Joël', surname: 'HECKMANN', role: 'Apprenti', update: './'},
  {name: 'Tristan', surname: 'BAHUAUD', role: 'Apprenti', update: './'},
  {name: 'Thomas', surname: 'DHUICQ', role: 'Apprenti', update: './'}
];

export interface Team {
  apprentice: string;
  tutor: string;
  master: string;
  update: string;
}

const TEAMS_DATA: Team[] = [
  {apprentice: 'Mathilde RENAUD', tutor: 'Jérome ROQUEBERT', master: 'Nicolas CAILLEAU', update: './'},
  {apprentice: 'Mathilde RENAUD', tutor: 'Jérome ROQUEBERT', master: 'Nicolas CAILLEAU', update: './'},
  {apprentice: 'Mathilde RENAUD', tutor: 'Jérome ROQUEBERT', master: 'Nicolas CAILLEAU', update: './'},
  {apprentice: 'Mathilde RENAUD', tutor: 'Jérome ROQUEBERT', master: 'Nicolas CAILLEAU', update: './'},
  {apprentice: 'Mathilde RENAUD', tutor: 'Jérome ROQUEBERT', master: 'Nicolas CAILLEAU', update: './'}
];
