import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompanyService } from 'src/app/services/company/company.service';
import { Company } from 'src/app/models/Company';
import { FormationCenterService } from '@app/services/formation-center/formation-center.service';
import { FormationCenter } from 'src/app/models/FormationCenter';
import { YearGroupService } from 'src/app/services/year-group/year-group.service';
import { YearGroup } from 'src/app/models/YearGroup';
import { Role } from '@app/helpers';
import { UserService } from '@app/services';

@Component({
  selector: 'app-add-user-popup',
  templateUrl: './add-user-popup.component.html',
  styleUrls: ['./add-user-popup.component.scss'],
})
export class AddUserPopupComponent implements OnInit {
  selectedRole = '';
  fromDialog!: string;
  register: any;
  companys: Company[] = [];
  formationCenters: FormationCenter[] = [];
  yearGroups: YearGroup[] = [];
  readonly roleEnum = Role;

  roles: any[] = [
    { name: 'Apprenti', value: Role.APPRENTICE },
    { name: 'Maître apprentissage', value: Role.MENTOR },
    { name: 'Tuteur pédagogique', value: Role.TUTOR },
    { name: 'Compte Entreprise', value: Role.COMPANY },
  ];

  constructor(
    public dialogRef: MatDialogRef<AddUserPopupComponent>,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private yearGroupService: YearGroupService,
    private companyService: CompanyService,
    private formationCenterService: FormationCenterService,
    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any
  ) {}

  ngOnInit(): void {
    this.register = {
      role: '',
      promotion: '',
      last_name: '',
      first_name: '',
      email: '',
      company: '',
    };
    this.getYearGroup();
    this.getCompany();
    this.getFormationCenter();
  }

  private getYearGroup() {
    this.yearGroupService.getAll().subscribe({
      next: (yearGroupsData) => {
        this.yearGroups = yearGroupsData;
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

  private getCompany() {
    this.companyService.getAll().subscribe({
      next: (companysData) => {
        //this.companys = companysData;
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

  private getFormationCenter() {
    this.formationCenterService.getAll().subscribe({
      next: (formationCentersData) => {
        this.formationCenters = formationCentersData;
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

  public closeDialog() {
    this.dialogRef.close({ event: 'close', data: this.fromDialog });
  }

  public addUser(data: any) {
    if (this.userFormValidator(data)) {
      this.userService.add(data).subscribe({
        next: (v) => {
          this.displaySnackBar('✔ Inscription réussie');
          this.closeDialog();
        },
        error: (err) => {
          this.displaySnackBar('❌ Une erreur est survenue');
        },
      });
    }
  }

  private userFormValidator(data: any) {
    var emailCondition = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    var lastNameCondition = data.last_name != '' && data.last_name.length >= 2;
    var firstNameCondition =
      data.first_name != '' && data.first_name.length >= 2;

    // Vérifie chaque champs et affiche le message d'erreur correspondant
    if (!data.role) {
      this.displaySnackBar('❌ Rôle est requis');
      return false;
    }

    if (data.role == 'Apprenti' && data.promotion == '') {
      this.displaySnackBar('❌ Promotion est requis');
      return false;
    }

    if (!(lastNameCondition && firstNameCondition)) {
      this.displaySnackBar('❌ Noms invalides');
      return false;
    }

    if (!emailCondition.test(data.email)) {
      this.displaySnackBar('❌ Email invalide');
      return false;
    }

    return true;
  }

  private displaySnackBar(msg: string) {
    this._snackBar.open(msg, 'Ok', { duration: 2000 });
  }
}
