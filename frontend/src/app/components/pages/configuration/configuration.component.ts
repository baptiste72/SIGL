import { AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddUserPopupComponent } from '../../pop-up/add-user-popup/add-user-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { AddPromotionPopupComponent } from '../../pop-up/add-promotion-popup/add-promotion-popup.component';
import { AddTeamPopupComponent } from '../../pop-up/add-team-popup/add-team-popup.component';
import { AddCompanyPopupComponent } from '../../pop-up/add-company-popup/add-company-popup.component';
import { AddSemesterPopupComponent } from '../../pop-up/add-semester-popup/add-semester-popup.component';
import { YearGroupService } from 'src/app/services/year-group/year-group.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TutorTeamService } from 'src/app/services/tutor-team/tutor-team.service';
import { TutorTeam } from 'src/app/models/TutorTeam';

@Component({
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements AfterViewInit, OnInit {
  register: any;
  displayedColumnsUsers: string[] = ['name', 'surname', 'role', 'update'];
  dataSourceUsers = new MatTableDataSource<User>(USERS_DATA);

  displayedColumnsTeams: string[] = ['apprentice', 'tutor', 'mentor', 'update'];
  dataSourceTutorTeams: any;

  displayedColumnsCompanies: string[] = ['name', 'companySiret', 'nbEmployees', 'codeCpne'];
  dataSourceCompanies = new MatTableDataSource<Company>(COMPANIES_DATA);

  displayedColumnsPromotions: string[] = ['name', 'beginDate', 'update'];
  dataSourcePromotions: any;

  displayedColumnsSemesters: string[] = ['name', 'beginDate', 'endDate'];
  dataSourceSemesters = new MatTableDataSource<Semester>(SEMESTERS_DATA);


  @ViewChild(MatPaginator) usersPaginator :any = MatPaginator;
  @ViewChild(MatPaginator) tutorTeamsPaginator :any = MatPaginator;
  @ViewChild(MatPaginator) companiesPaginator :any = MatPaginator;
  @ViewChild(MatPaginator) promotionsPaginator :any = MatPaginator;
  @ViewChild(MatPaginator) semestersPaginator :any = MatPaginator;

  ngOnInit(): void {
    this.getPromotions();
    this.getTutorTeam();
    this.register = {
      id: '',
    };
  }

  ngAfterViewInit() {
    this.dataSourceUsers.paginator = this.usersPaginator;
    this.dataSourceTutorTeams.paginator = this.tutorTeamsPaginator;
    this.dataSourceCompanies.paginator = this.companiesPaginator;
    this.dataSourcePromotions.paginator = this.promotionsPaginator;
    this.dataSourceSemesters.paginator = this.promotionsPaginator;
  }

  constructor(public dialog: MatDialog,
    private yearGroupService: YearGroupService,
    private tutorTeamService: TutorTeamService,
    private _snackBar: MatSnackBar,
    private _detector: ChangeDetectorRef,
    ) {}

  private getPromotions() {
    this.yearGroupService.getYearGroup().subscribe({
      next: (promotions) => {
        this.dataSourcePromotions = new MatTableDataSource<Promotion>(promotions);
      },
      error: (err) => {
        this._snackBar.open('❌ Une erreur est survenue lors de la récupération des semestres', 'Ok', {
          duration: 2000,
        });
      },
    });
  }

  private getTutorTeam() {
    this.tutorTeamService.getTutorsTeam().subscribe({
      next: (tutorTeamData) => {
        this.dataSourceTutorTeams = new MatTableDataSource<TutorTeam>(tutorTeamData);
      },
      error: (err) => {
        this._snackBar.open(
          '❌ Une erreur est survenue lors de la récupération des équipes pédagohiques',
          'Ok',
          {
            duration: 2000,
          }
        );
      },
    });
  }

  addUser() {
    this.dialog.open(AddUserPopupComponent,
      {
        width: '600px'
      }
    );
  }

  openPromotionPopup() {
    this.dialog.open(AddPromotionPopupComponent,
      {
        width: '600px'
      }
    ).afterClosed()
    .subscribe((shouldReload: boolean) => {
      this.getPromotions()
    });
  }

  deletePromotionById(ID: any) {
    this.register.id=ID;
    this.yearGroupService.deleteYearGroupById(this.register).subscribe({
      next: (v) => {
        this.getPromotions();
      },
      error: (err) => {
        this._snackBar.open('❌ Une erreur est survenue lors de la suppression de la promotion', 'Ok', {
          duration: 2000,
        });
      },
    });
  }

  openTutorTeamPopUp() {
    this.dialog.open(AddTeamPopupComponent,
      {
        width: '600px'
      }
    ).afterClosed()
    .subscribe((shouldReload: boolean) => {
      this.getTutorTeam()
    });
  }

  addCompany() {
    this.dialog.open(AddCompanyPopupComponent,
      {
        width: '600px'
      }
    );
  }

  addSemester() {
    this.dialog.open(AddSemesterPopupComponent,
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

export interface Promotion {
  id: number;
  worded: string;
  beginDate: Date;
}

export interface Semester {
  name: string;
  beginDate: Date;
  endDate: Date;
}

const SEMESTERS_DATA: Semester[] = [
  {name: 'Semestre 1', beginDate: new Date('1/1/16'), endDate: new Date('1/1/16')}
];
