import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddCompanyFormComponent } from '../../forms/add-company-form/add-company-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user/user.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ConfirmDeleteComponent } from '@app/components/pop-up/confirm-delete/confirm-delete.component';
import { CompanyService } from '@app/services/company/company.service';
import { CompanyUser } from '@app/models/CompanyUser';
import { Role } from '@app/helpers';
import { CompanyUserService } from '@app/services/company-user/company-user.service';
import { AuthService } from '@app/services';
import { AddApprenticePopupComponent } from '@app/components/pop-up/apprentice/add-apprentice-popup/add-apprentice-popup.component';
import { ApprenticeInfo } from '@app/models/ApprenticeInfo';

@Component({
  templateUrl: './dashboard-company.component.html',
  styleUrls: ['./dashboard-company.component.scss'],
})
export class DashboardCompanyComponent {
  // Détermine si l'onglet concerné a déjà été chargé
  private hlUsers = false;
  private hlCompanies = false;
  compUser: CompanyUser;

  public dataSourceApprentices: MatTableDataSource<ApprenticeInfo>;
  @ViewChild('apprenticePaginator') ApprenticePaginator!: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private confirmDeleteDialogRef: MatDialogRef<ConfirmDeleteComponent>,
    private userService: UserService,
    private authService: AuthService,
    private companyService: CompanyService,
    private companyUserService: CompanyUserService,
    private _snackBar: MatSnackBar
  ) {
    this.dataSourceApprentices = new MatTableDataSource<ApprenticeInfo>();


    this.compUser = new CompanyUser(
      999,
      'TOTO',
      'TOTOT',
      'test@gmail.com',
      Role.COMPANY,
      0,
      0,
      0
    );
  }

  public onTabChange($event: MatTabChangeEvent) {
    switch ($event.tab.textLabel) {
      case 'companies':
        if (!this.hlCompanies) {
          //this.loadCompany();
          break;
        }
    }
  }



  // const APPRENTICES_DATA: ApprenticeInfo[] = [
  //   { app_last_name: 'Mathilde', app_first_name: 'RENAUD', app_job_title: 'Apprenti', app_phone: './' },
  //   { app_last_name: 'Mathilde', app_first_name: 'RENAUD', app_job_title: 'Apprenti', app_phone: './' },
  //   { app_last_name: 'Mathilde', app_first_name: 'RENAUD', app_job_title: 'Apprenti', app_phone: './' },
  //   { app_last_name: 'Mathilde', app_first_name: 'RENAUD', app_job_title: 'Apprenti', app_phone: './' },
  //   { app_last_name: 'Mathilde', app_first_name: 'RENAUD', app_job_title: 'Apprenti', app_phone: './' },
  // ];
}
