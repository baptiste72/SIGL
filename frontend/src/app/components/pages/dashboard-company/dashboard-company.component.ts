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

@Component({
  templateUrl: './dashboard-company.component.html',
  styleUrls: ['./dashboard-company.component.scss'],
})
export class DashboardCompanyComponent {
  // Détermine si l'onglet concerné a déjà été chargé
  private hlUsers = false;
  private hlCompanies = false;
  compUser: CompanyUser;


  constructor(
    public dialog: MatDialog,
    private confirmDeleteDialogRef: MatDialogRef<ConfirmDeleteComponent>,
    private userService: UserService,
    private authService: AuthService,
    private companyService: CompanyService,
    private companyUserService: CompanyUserService,
    private _snackBar: MatSnackBar
  ) {

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
}

