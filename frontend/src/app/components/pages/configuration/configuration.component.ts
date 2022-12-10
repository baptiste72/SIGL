import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddUserPopupComponent } from '../../pop-up/user/add-user-popup/add-user-popup.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddYearGroupPopupComponent } from '../../pop-up/year-group/add-year-group-popup/add-year-group-popup.component';
import { UpdateYearGroupPopupComponent } from '../../pop-up/year-group/update-year-group-popup/update-year-group-popup/update-year-group-popup.component';
import { AddTeamPopupComponent } from '../../pop-up/tutor-team/add-team-popup/add-team-popup.component';
import { AddCompanyPopupComponent } from '../../pop-up/company/add-company-popup/add-company-popup.component';
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
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ConfirmDeleteComponent } from '@app/components/pop-up/confirm-delete/confirm-delete.component';
import { lastValueFrom } from 'rxjs';
import { UpdateTeamPopupComponent } from '@app/components/pop-up/tutor-team/update-team-popup/update-team-popup.component';

@Component({
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent implements OnInit, AfterViewInit {
  // Détermine si l'onglet concerné a déjà été chargé
  private hlUsers = false;
  private hlCompanies = false;
  private hlTutorTeams = false;
  private hlYearGroups = false;
  private hlSemesters = false;

  public displayedColumnsUsers: string[] = [
    'first_name',
    'last_name',
    'email',
    'role',
    'update',
  ];
  public dataSourceUsers: MatTableDataSource<User>;
  @ViewChild('userPaginator') usersPaginator!: MatPaginator;

  public displayedColumnsTeams: string[] = [
    'apprentice',
    'tutor',
    'mentor',
    'update',
  ];
  public dataSourceTutorTeams: MatTableDataSource<TutorTeam>;
  @ViewChild('tutorTeamPaginator') tutorTeamsPaginator!: MatPaginator;

  public displayedColumnsCompanies: string[] = [
    'name',
    'companySiret',
    'nbEmployees',
    'codeCpne',
  ];
  public dataSourceCompanies: MatTableDataSource<Company>;
  @ViewChild('companiesPaginator') companiesPaginator!: MatPaginator;

  public displayedColumnsYearGroups: string[] = ['name', 'beginDate', 'update'];
  public dataSourceYearGroups: MatTableDataSource<YearGroup>;
  @ViewChild('yearGroupPaginator') yearGroupPaginator!: MatPaginator;

  public displayedColumnsSemesters: string[] = [
    'name',
    'beginDate',
    'endDate',
    'update',
  ];
  public dataSourceSemesters: MatTableDataSource<Semester>;
  @ViewChild('semestersPaginator') semestersPaginator!: MatPaginator;

  ngOnInit(): void {
    // On charge le premier onglet
    this.loadUsers();
  }

  ngAfterViewInit(): void {
    this.dataSourceUsers.paginator = this.usersPaginator;
    this.dataSourceTutorTeams.paginator = this.tutorTeamsPaginator;
    this.dataSourceCompanies.paginator = this.companiesPaginator;
    this.dataSourceYearGroups.paginator = this.yearGroupPaginator;
    this.dataSourceSemesters.paginator = this.semestersPaginator;
  }

  constructor(
    public dialog: MatDialog,
    private confirmDeleteDialogRef: MatDialogRef<ConfirmDeleteComponent>,
    private userService: UserService,
    private yearGroupService: YearGroupService,
    private semesterService: SemesterService,
    private tutorTeamService: TutorTeamService,
    private _snackBar: MatSnackBar
  ) {
    this.dataSourceCompanies = new MatTableDataSource<Company>(COMPANIES_DATA);
    this.dataSourceSemesters = new MatTableDataSource<Semester>();
    this.dataSourceTutorTeams = new MatTableDataSource<TutorTeam>();
    this.dataSourceUsers = new MatTableDataSource<User>();
    this.dataSourceYearGroups = new MatTableDataSource<YearGroup>();
  }

  public onTabChange($event: MatTabChangeEvent) {
    switch ($event.tab.textLabel) {
      case 'users':
        if (!this.hlUsers) {
          this.loadUsers();
        }
        break;
      case 'companies':
        if (!this.hlCompanies) {
          // TODO: Récupérer les companies
          // TODO: Intégrer la ligne suivante dans le loadCompanies
          // this.dataSourceCompanies.paginator = this.companiesPaginator;
        }
        break;
      case 'tutor-teams':
        if (!this.hlTutorTeams) {
          this.loadTutorTeams();
        }
        break;
      case 'year-groups':
        if (!this.hlYearGroups) {
          this.loadYearGroups();
        }
        break;
      case 'semesters':
        if (!this.hlSemesters) {
          this.loadSemesters();
        }
        break;
    }
  }

  // Récupération des données en base
  private loadYearGroups() {
    this.yearGroupService.getAll().subscribe({
      next: (yearGroups) => {
        this.dataSourceYearGroups = new MatTableDataSource<YearGroup>(
          yearGroups
        );
        this.hlYearGroups = true;
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

  private loadTutorTeams() {
    this.tutorTeamService.getAll().subscribe({
      next: (tutorTeamData) => {
        this.dataSourceTutorTeams = new MatTableDataSource<TutorTeam>(
          tutorTeamData
        );
        this.dataSourceTutorTeams.paginator = this.tutorTeamsPaginator;
        this.hlTutorTeams = true;
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

  private loadUsers() {
    this.userService.getAll().subscribe({
      next: (userData) => {
        this.dataSourceUsers = new MatTableDataSource<User>(userData);
        this.dataSourceUsers.paginator = this.usersPaginator;
        this.hlUsers = true;
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

  private loadSemesters() {
    this.semesterService.getAll().subscribe({
      next: (semesters) => {
        this.dataSourceSemesters = new MatTableDataSource<Semester>(semesters);
        this.hlSemesters = true;
        this.dataSourceSemesters.paginator = this.semestersPaginator;
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

  //#region Popups
  // Ouvertures
  public openYearGroupPopup() {
    this.dialog
      .open(AddYearGroupPopupComponent, {
        width: '600px',
      })
      .afterClosed()
      .subscribe((shouldReload: boolean) => {
        this.loadYearGroups();
      });
  }

  public openUpdateYearGroupPopup(yearGroup: any) {
    this.dialog
      .open(UpdateYearGroupPopupComponent, {
        width: '600px',
        data: yearGroup,
      })
      .afterClosed()
      .subscribe((shouldReload: boolean) => {
        this.loadYearGroups();
      });
  }

  public openAddSemesterPopup() {
    this.dialog
      .open(AddSemesterPopupComponent, {
        width: '600px',
      })
      .afterClosed()
      .subscribe((shouldReload: boolean) => {
        this.loadSemesters();
      });
  }

  public openUpdateSemesterPopup(semester: any) {
    this.dialog
      .open(UpdateSemesterPopupComponent, {
        width: '600px',
        data: semester,
      })
      .afterClosed()
      .subscribe((shouldReload: boolean) => {
        this.loadSemesters();
      });
  }

  public openUserPopup() {
    this.dialog
      .open(AddUserPopupComponent, {
        width: '600px',
      })
      .afterClosed()
      .subscribe((shouldReload: boolean) => {
        this.loadUsers();
      });
  }

  public openUpdateUserPopup(user: any) {
    this.dialog
      .open(UpdateUserPopupComponent, {
        width: '600px',
        data: user,
      })
      .afterClosed()
      .subscribe((shouldReload: boolean) => {
        this.loadUsers();
      });
  }

  public openTutorTeamPopUp() {
    this.dialog
      .open(AddTeamPopupComponent, {
        width: '600px',
      })
      .afterClosed()
      .subscribe((shouldReload: boolean) => {
        this.loadTutorTeams();
      });
  }

  public openUpdateTutorTeamPopup(tutorTeam: TutorTeam) {
    this.dialog
      .open(UpdateTeamPopupComponent, {
        width: '600px',
        data: tutorTeam,
      })
      .afterClosed()
      .subscribe((shouldReload: boolean) => {
        this.loadTutorTeams();
      });
  }

  public addCompany() {
    this.dialog.open(AddCompanyPopupComponent, {
      width: '600px',
    });
  }
  //#endregion Popups

  // Suppresions
  public async openConfirmDeletePopup(content: string): Promise<boolean> {
    this.confirmDeleteDialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '600px',
    });

    this.confirmDeleteDialogRef.componentInstance.content = content;

    return await lastValueFrom(this.confirmDeleteDialogRef.afterClosed());
  }

  public async deleteYearGroupById(id: any) {
    const shouldDelete = await this.openConfirmDeletePopup(
      'Souhaitez-vous vraiment supprimer cette promotion ?'
    );
    if (shouldDelete) {
      this.yearGroupService.delete(id).subscribe({
        next: (v) => {
          this.loadYearGroups();
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
  }

  public async deleteSemesterById(id: any) {
    const shouldDelete = await this.openConfirmDeletePopup(
      'Souhaitez-vous vraiment supprimer ce semestre ?'
    );
    if (shouldDelete) {
      this.semesterService.delete(id).subscribe({
        next: (v) => {
          this.loadSemesters();
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
  }

  public async deleteUserById(id: any) {
    const shouldDelete = await this.openConfirmDeletePopup(
      'Souhaitez-vous vraiment supprimer cet utilisateur ?'
    );
    if (shouldDelete) {
      this.userService.delete(id).subscribe({
        next: (v) => {
          this.loadUsers();
        },
        error: (err) => {
          this._snackBar.open(
            "❌ Une erreur est survenue lors de la suppression d'un utilisateur",
            'Ok',
            { duration: 2000 }
          );
        },
      });
    }
  }

  public async deleteTutorTeam(id: any) {
    const shouldDelete = await this.openConfirmDeletePopup(
      'Souhaitez-vous vraiment supprimer cet utilisateur ?'
    );
    if (shouldDelete) {
      this.tutorTeamService.delete(id).subscribe({
        next: (v) => {
          this.loadTutorTeams();
        },
        error: (err) => {
          this._snackBar.open(
            "❌ Une erreur est survenue lors de la suppression d'une équipe",
            'Ok',
            { duration: 2000 }
          );
        },
      });
    }
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
