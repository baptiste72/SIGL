import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddUserPopupComponent } from '../../pop-up/user/add-user-popup/add-user-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { AddYearGroupPopupComponent } from '../../pop-up/year-group/add-year-group-popup/add-year-group-popup.component';
import { UpdateYearGroupPopupComponent } from '../../pop-up/year-group/update-year-group-popup/update-year-group-popup/update-year-group-popup.component';
import { AddTeamPopupComponent } from '../../pop-up/add-team-popup/add-team-popup.component';
import { AddCompanyPopupComponent } from '../../pop-up/add-company-popup/add-company-popup.component';
import { AddSemesterPopupComponent } from '../../pop-up/semester/add-semester-popup/add-semester-popup.component';
import { YearGroupService } from 'src/app/services/year-group/year-group.service';
import { SemesterService } from 'src/app/services/semester/semester.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { YearGroup } from 'src/app/models/YearGroup';
import { Semester } from 'src/app/models/Semester';
import { UpdateSemesterPopupComponent } from '../../pop-up/semester/update-semester-popup/update-semester-popup/update-semester-popup.component';
import { TutorTeamService } from 'src/app/services/tutor-team/tutor-team.service';
import { TutorTeam } from 'src/app/models/TutorTeam';
import { UserService } from 'src/app/services/user/user.service';
import { UpdateUserPopupComponent } from '../../pop-up/user/update-user-popup/update-user-popup/update-user-popup.component';

@Component({
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent implements AfterViewInit, OnInit {
  register: any;
  displayedColumnsUsers: string[] = ['name', 'surname', 'email', 'role', 'update'];
  dataSourceUsers: any;

  displayedColumnsTeams: string[] = ['apprentice', 'tutor', 'mentor', 'update'];
  dataSourceTutorTeams: any;

  displayedColumnsCompanies: string[] = [
    'name',
    'companySiret',
    'nbEmployees',
    'codeCpne',
  ];
  dataSourceCompanies = new MatTableDataSource<Company>(COMPANIES_DATA);

  displayedColumnsYearGroups: string[] = ['name', 'beginDate', 'update'];
  dataSourceYearGroups: any;

  displayedColumnsSemesters: string[] = [
    'name',
    'beginDate',
    'endDate',
    'update',
  ];
  dataSourceSemesters: any;

  @ViewChild(MatPaginator) usersPaginator: any = MatPaginator;
  @ViewChild(MatPaginator) tutorTeamsPaginator: any = MatPaginator;
  @ViewChild(MatPaginator) companiesPaginator: any = MatPaginator;
  @ViewChild(MatPaginator) yearGroupPaginator: any = MatPaginator;
  @ViewChild(MatPaginator) semestersPaginator: any = MatPaginator;

  ngOnInit(): void {
    this.getYearGroup();
    this.getSemester();
    this.getTutorTeam();
    this.getUser();
    this.register = {
      id: '',
    };
  }

  ngAfterViewInit() {
    this.dataSourceUsers.paginator = this.usersPaginator;
    this.dataSourceTutorTeams.paginator = this.tutorTeamsPaginator;
    this.dataSourceCompanies.paginator = this.companiesPaginator;
    this.dataSourceYearGroups.paginator = this.yearGroupPaginator;
    this.dataSourceSemesters.paginator = this.yearGroupPaginator;
  }

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private yearGroupService: YearGroupService,
    private semesterService: SemesterService,
    private tutorTeamService: TutorTeamService,
    private _snackBar: MatSnackBar,
    private _detector: ChangeDetectorRef
  ) {}

  // PROMOTIONS
  private getYearGroup() {
    this.yearGroupService.getYearGroup().subscribe({
      next: (promotions) => {
        this.dataSourceYearGroups = new MatTableDataSource<YearGroup>(
          promotions
        );
      },
      error: (err) => {
        this._snackBar.open(
          '❌ Une erreur est survenue lors de la récupération des semestres',
          'Ok',
          { duration: 2000 }
        );
      },
    });
  }

  private getTutorTeam() {
    this.tutorTeamService.getTutorsTeam().subscribe({
      next: (tutorTeamData) => {
        this.dataSourceTutorTeams = new MatTableDataSource<TutorTeam>(
          tutorTeamData
        );
      },
      error: (err) => {
        this._snackBar.open(
          '❌ Une erreur est survenue lors de la récupération des équipes pédagogiques',
          'Ok',
          { duration: 2000 }
        );
      },
    });
  }

  private getUser() {
    this.userService.getUser().subscribe({
      next: (userData) => {
        this.dataSourceUsers = new MatTableDataSource<User>(userData);
      },
      error: (err) => {
        this._snackBar.open(
          '❌ Une erreur est survenue lors de la récupération des équipes pédagogiques',
          'Ok',
          { duration: 2000 }
        );
      },
    });
  }

  openYearGroupPopup() {
    this.dialog
      .open(AddYearGroupPopupComponent, {
        width: '600px',
      })
      .afterClosed()
      .subscribe((shouldReload: boolean) => {
        this.getYearGroup();
      });
  }

  openUpdateYearGroupPopup(yearGroup: any) {
    this.dialog
      .open(UpdateYearGroupPopupComponent, {
        width: '600px',
        data: yearGroup,
      })
      .afterClosed()
      .subscribe((shouldReload: boolean) => {
        this.getYearGroup();
      });
  }

  deleteYearGroupById(ID: any) {
    this.register.id = ID;
    this.yearGroupService.deleteYearGroupById(this.register).subscribe({
      next: (v) => {
        this.getYearGroup();
      },
      error: (err) => {
        this._snackBar.open(
          '❌ Une erreur est survenue lors de la suppression de la promotion',
          'Ok',
          { duration: 2000 }
        );
      },
    });
  }

  // SEMESTRES
  private getSemester() {
    this.semesterService.getSemester().subscribe({
      next: (semesters) => {
        this.dataSourceSemesters = new MatTableDataSource<Semester>(semesters);
      },
      error: (err) => {
        this._snackBar.open(
          '❌ Une erreur est survenue lors de la récupération des semestres',
          'Ok',
          {
            duration: 2000,
          }
        );
      },
    });
  }

  openAddSemesterPopup() {
    this.dialog
      .open(AddSemesterPopupComponent, {
        width: '600px',
      })
      .afterClosed()
      .subscribe((shouldReload: boolean) => {
        this.getSemester();
      });
  }

  openUpdateSemesterPopup(semester: any) {
    this.dialog
      .open(UpdateSemesterPopupComponent, {
        width: '600px',
        data: semester,
      })
      .afterClosed()
      .subscribe((shouldReload: boolean) => {
        this.getSemester();
      });
  }

  deleteSemesterById(ID: any) {
    this.register.id = ID;
    this.semesterService.deleteSemesterById(this.register).subscribe({
      next: (v) => {
        this.getSemester();
      },
      error: (err) => {
        this._snackBar.open(
          '❌ Une erreur est survenue lors de la suppression du semestre',
          'Ok',
          { duration: 2000 }
        );
      },
    });
  }

  openUserPopup() {
    this.dialog
      .open(AddUserPopupComponent, {
        width: '600px',
      })
      .afterClosed()
      .subscribe((shouldReload: boolean) => {
        this.getUser();
      });
  }

  openUpdateUserPopup(user: any) {
    this.dialog
      .open(UpdateUserPopupComponent, {
        width: '600px',
        data: user,
      })
      .afterClosed()
      .subscribe((shouldReload: boolean) => {
        this.getUser();
      });
  }

  deleteUserById(ID: any) {
    this.register.id = ID;
    this.userService.deleteUserById(this.register).subscribe({
      next: (v) => {
        this.getUser();
      },
      error: (err) => {
        this._snackBar.open(
          '❌ Une erreur est survenue lors de la suppression du semestre',
          'Ok',
          { duration: 2000 }
        );
      },
    });
  }

  // EQUIPES PEDAGOGIQUES
  openTutorTeamPopUp() {
    this.dialog
      .open(AddTeamPopupComponent, {
        width: '600px',
      })
      .afterClosed()
      .subscribe((shouldReload: boolean) => {
        this.getTutorTeam();
      });
  }

  // ENTREPRISES
  addCompany() {
    this.dialog.open(AddCompanyPopupComponent, {
      width: '600px',
    });
  }
}

export interface User {
  name: string;
  surname: string;
  role: string;
  update: string;
}

const USERS_DATA: User[] = [
  { name: 'Mathilde', surname: 'RENAUD', role: 'Apprenti', update: './' },
  { name: 'Hugo', surname: 'TANNIOU', role: 'Apprenti', update: './' },
  { name: 'Joël', surname: 'HECKMANN', role: 'Apprenti', update: './' },
  { name: 'Tristan', surname: 'BAHUAUD', role: 'Apprenti', update: './' },
  { name: 'Thomas', surname: 'DHUICQ', role: 'Apprenti', update: './' },
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
  {
    name: 'Itanica',
    companySiret: '399 826 981 00017',
    nbEmployees: 250,
    codeCpne: '123',
    cideIdcc: '123',
    collectiveConvention: '123',
    codeNafApe: '123',
    activityArea: '123',
    phoneNumber: '123',
    mailAddress: '123',
    address: '123',
    trainingSiteName: '123',
    trainingSiteSiret: '123',
    trainingSiteAddress: '123',
    opcoName: '123',
    opcoSiret: '123',
    opcoAddress: '123',
    opcoPhoneNumber: '123',
    opcoMailAddress: '123',
  },
];
