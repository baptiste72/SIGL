import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddUserPopupComponent } from '../../pop-up/add-user-popup/add-user-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { AddPromotionPopupComponent } from '../../pop-up/add-promotion-popup/add-promotion-popup.component';
import { AddTeamPopupComponent } from '../../pop-up/add-team-popup/add-team-popup.component';
import { AddCompanyPopupComponent } from '../../pop-up/add-company-popup/add-company-popup.component';

@Component({
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements AfterViewInit {
  displayedColumnsUsers: string[] = ['name', 'surname', 'role', 'update'];
  dataSourceUsers = new MatTableDataSource<User>(USERS_DATA);

  displayedColumnsTeams: string[] = ['apprentice', 'tutor', 'master', 'update'];
  dataSourceTeams = new MatTableDataSource<Team>(TEAMS_DATA);

  displayedColumnsCompanies: string[] = ['name', 'companySiret', 'nbEmployees', 'codeCpne'];
  dataSourceCompanies = new MatTableDataSource<Company>(COMPANIES_DATA);

  @ViewChild(MatPaginator) paginator :any = MatPaginator;
  @ViewChild(MatPaginator) paginator2 :any = MatPaginator;
  @ViewChild(MatPaginator) paginator3 :any = MatPaginator;

  ngAfterViewInit() {
    this.dataSourceUsers.paginator = this.paginator;
    this.dataSourceTeams.paginator = this.paginator2;
    this.dataSourceCompanies.paginator = this.paginator3;
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

  addCompany() {
    this.dialog.open(AddCompanyPopupComponent,
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

export interface Company {
  name: string;
  companySiret: string;
  nbEmployees: number;
  codeCpne: string;
  cideIdcc: string;
  collectiveConvention: string;
  codeNafApe: string;
  activityArea: string;
  phoneNumber: string;
  mailAddress: string;
  address: string;
  trainingSiteName: string;
  trainingSiteSiret: string;
  trainingSiteAddress: string;
  opcoName: string;
  opcoSiret: string;
  opcoAddress: string;
  opcoPhoneNumber: string;
  opcoMailAddress: string;
}

const COMPANIES_DATA: Company[] = [
  {name: 'Itanica', companySiret: '399 826 981 00017', nbEmployees: 250, codeCpne: '123',
  cideIdcc: '123', collectiveConvention: '123', codeNafApe: '123', activityArea: '123', phoneNumber: '123',
  mailAddress: '123', address: '123', trainingSiteName: '123', trainingSiteSiret: '123', trainingSiteAddress: '123',
  opcoName: '123', opcoSiret: '123', opcoAddress: '123', opcoPhoneNumber: '123', opcoMailAddress: '123',
 }
];

