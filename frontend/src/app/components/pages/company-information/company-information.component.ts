import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ConfirmDeleteComponent } from '@app/components/pop-up/confirm-delete/confirm-delete.component';
import { CompanyUser } from '@app/models/CompanyUser';
import { Role } from '@app/helpers';
import { CompanyUserService } from '@app/services/company-user/company-user.service';
import { AuthService } from '@app/services';
import { ApprenticeInfo } from '@app/models/ApprenticeInfo';
import { ApprenticeInfoService } from '@app/services/apprentice-info/apprentice-info.service';
import { AddApprenticeInfoPopupComponent } from '@app/components/pop-up/apprentice/add-apprentice-popup/add-apprentice-popup.component';
import { Mentor } from '@app/models/Mentor';
import { MentorService } from '@app/services/mentor/mentor.service';
import { AddMentorPopupComponent } from '@app/components/pop-up/mentor/add-mentor-popup/add-mentor-popup.component';
import { UpdateApprenticeInfoPopupComponent } from '@app/components/pop-up/apprentice/update-apprentice-popup/update-apprentice-popup.component';
import { UpdateMentorPopupComponent } from '@app/components/pop-up/mentor/update-mentor-popup/update-mentor-popup.component';

@Component({
  templateUrl: './company-information.component.html',
  styleUrls: ['./company-information.component.scss'],
})
export class CompanyInformationComponent implements AfterViewInit {
  // Détermine si l'onglet concerné a déjà été chargé
  private hlApprentices = false;
  private hlMentors = false;
  compUser: CompanyUser;

  public displayedColumnsApprentice: string[] = [
    'app_first_name',
    'app_last_name',
    'app_job_title',
    'app_phone',
    'update',
  ];

  public dataSourceApprentices: MatTableDataSource<ApprenticeInfo>;
  @ViewChild('apprenticePaginator') ApprenticePaginator!: MatPaginator;

  public displayedColumnsMentors: string[] = [
    'first_name',
    'last_name',
    'mt_job_title',
    'mt_phone',
    'update',
  ];

  public dataSourceMentors: MatTableDataSource<Mentor>;
  @ViewChild('mentorPaginator') MentorPaginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.getCompanyUser(this.authService.userValue.id);
    this.dataSourceApprentices.paginator = this.ApprenticePaginator;
    this.dataSourceMentors.paginator = this.MentorPaginator;
  }

  constructor(
    public dialog: MatDialog,
    private confirmDeleteDialogRef: MatDialogRef<ConfirmDeleteComponent>,
    private apprenticeInfoService: ApprenticeInfoService,
    private authService: AuthService,
    private mentorService: MentorService,
    private companyUserService: CompanyUserService,
    private _snackBar: MatSnackBar
  ) {
    this.dataSourceApprentices = new MatTableDataSource<ApprenticeInfo>();
    this.dataSourceMentors = new MatTableDataSource<Mentor>();

    this.compUser = new CompanyUser(
      999,
      'TOTO',
      'TOTOT',
      'test@gmail.com',
      Role.COMPANY,
      '0',
      '0',
      '0'
    );
  }

  public onTabChange($event: MatTabChangeEvent) {
    switch ($event.tab.textLabel) {
      case 'apprentices':
        if (!this.hlApprentices) {
          console.log('toto');
          this.loadApprentices();
        }
        break;
      case 'mentors':
        if (!this.hlMentors) {
          this.loadMentors();
        }
    }
  }

  public getCompanyUser(id: number) {
    this.companyUserService.getById(id).subscribe({
      next: (user) => {
        if (this.compUser.company_siret != null) {
          this.compUser = user;
        }
      },
      error: (err) => {
        this._snackBar.open(
          '❌ Une erreur est survenue lors de la récuperation du user'
        );
      },
    });
  }

  private loadApprentices() {
    this.apprenticeInfoService
      .getAllByCompany(this.compUser.company_siret)
      .subscribe({
        next: (apprenticeData) => {
          this.dataSourceApprentices = new MatTableDataSource<ApprenticeInfo>(
            apprenticeData
          );
          this.dataSourceApprentices.paginator = this.ApprenticePaginator;
          this.hlApprentices = true;
        },
        error: (err) => {
          this._snackBar.open(
            '❌ Une erreur est survenue lors de la récupération des utilisateurs',
            'Ok',
            { duration: 2000 }
          );
        },
      });
  }

  private loadMentors() {
    this.mentorService.getAllByCompany(this.compUser.company_siret).subscribe({
      next: (mentorData) => {
        this.dataSourceMentors = new MatTableDataSource<Mentor>(mentorData);
        this.dataSourceMentors.paginator = this.MentorPaginator;
        this.hlMentors = true;
      },
      error: (err) => {
        this._snackBar.open(
          '❌ Une erreur est survenue lors de la récupération des utilisateurs',
          'Ok',
          { duration: 2000 }
        );
      },
    });
  }

  public openApprenticePopup(compUser: any) {
    this.dialog
      .open(AddApprenticeInfoPopupComponent, {
        width: '600px',
        data: compUser,
      })
      .afterClosed()
      .subscribe((shouldReload: boolean) => {
        this.loadApprentices();
      });
    console.log('TUTU');
  }

  public openUpdateApprenticeInfoPopup(user: any) {
    this.dialog
      .open(UpdateApprenticeInfoPopupComponent, {
        width: '600px',
        data: user,
      })
      .afterClosed()
      .subscribe((shouldReload: boolean) => {
        this.loadApprentices();
      });
  }

  public openMentorPopup(compUser: any) {
    this.dialog
      .open(AddMentorPopupComponent, {
        width: '600px',
        data: compUser,
      })
      .afterClosed()
      .subscribe((shouldReload: boolean) => {
        this.loadMentors();
      });
  }

  public openUpdateMentorPopup(user: any) {
    this.dialog
      .open(UpdateMentorPopupComponent, {
        width: '600px',
        data: user,
      })
      .afterClosed()
      .subscribe((shouldReload: boolean) => {
        this.loadApprentices();
      });
  }
}
