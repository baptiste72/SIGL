import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/services/company/company.service';
import { OpcoService } from '@app/services/opco/opco.service';
import { ContactCompanyService } from '@app/services/contact-company/contact-company.service';
import { Company } from '@app/models/Company';
import { Opco } from '@app/models/Opco';
import { ContactCompany } from '@app/models/ContactCompany';
import { CompanyUser } from '@app/models/CompanyUser';
import { CompanyUserService } from '@app/services/company-user/company-user.service';
import { lastValueFrom } from 'rxjs';
import { Role } from '@app/helpers';

@Component({
  selector: 'app-add-company-popup',
  templateUrl: './add-company-popup.component.html',
  styleUrls: ['./add-company-popup.component.scss'],
})
export class AddCompanyPopupComponent implements OnInit {
  fromPage!: string;
  fromDialog: string;

  enterpriseForm: FormGroup;
  opcoForm: FormGroup;
  contactForm: FormGroup;

  isFormerESEO: string[] = ['Oui', 'Non'];
  stageInternat: string[] = ['Lu et approuvé'];
  isOptional = false;
  compUser: CompanyUser;

  //Regex validator
  private phoneValidator = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
  private stringValidator =
    /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
  private numberOnlyValidator = /^\d+$/;

  constructor(
    public dialogRef: MatDialogRef<AddCompanyPopupComponent>,
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private companyService: CompanyService,
    private opcoService: OpcoService,
    private contactCompanyService: ContactCompanyService,
    private authService: AuthService,
    private companyUserService: CompanyUserService,

    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any
  ) {
    this.enterpriseForm = this._formBuilder.group({
      cmp_name: [
        '',
        [Validators.required, Validators.pattern(this.stringValidator)],
      ],
      cmp_siret: [
        '',
        [Validators.required, Validators.pattern(this.numberOnlyValidator)],
      ],
      cmp_employees: [
        '',
        [Validators.required, Validators.pattern(this.numberOnlyValidator)],
      ],
      cmp_cpne: ['333', [Validators.required]],
      cmp_idcc: [
        '',
        [Validators.required, Validators.pattern(this.numberOnlyValidator)],
      ],
      cmp_convention: ['', Validators.required],
      cmp_naf_ape: ['', [Validators.required]],
      cmp_work_field: ['', Validators.required],
      cmp_phone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern(this.phoneValidator),
        ],
      ],
      cmp_email: ['', [Validators.required, Validators.email]],
      cmp_address: ['', Validators.required],
      cmp_internat: ['', Validators.required],
    });

    this.opcoForm = this._formBuilder.group({
      opco_cmp_siret: [
        '',
        [Validators.required, Validators.pattern(this.numberOnlyValidator)],
      ],
      opco_name: [
        '',
        [Validators.required, Validators.pattern(this.stringValidator)],
      ],
      opco_siret: [
        '',
        [Validators.required, Validators.pattern(this.numberOnlyValidator)],
      ],
      opco_address: ['', Validators.required],
      opco_phone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern(this.phoneValidator),
        ],
      ],
      opco_email: ['', [Validators.required, Validators.email]],
    });

    this.contactForm = this._formBuilder.group({
      ct_cmp_siret: [
        '',
        [Validators.required, Validators.pattern(this.numberOnlyValidator)],
      ],
      ct_last_name: [
        '',
        [Validators.required, Validators.pattern(this.stringValidator)],
      ],
      ct_first_name: [
        '',
        [Validators.required, Validators.pattern(this.stringValidator)],
      ],
      ct_phone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern(this.phoneValidator),
        ],
      ],
      ct_email: ['', [Validators.required, Validators.email]],
      ct_job_title: [
        '',
        [Validators.required, Validators.pattern(this.stringValidator)],
      ],
      ct_former_eseo: ['', Validators.required],
      fi_last_name: [
        '',
        [Validators.required, Validators.pattern(this.stringValidator)],
      ],
      fi_first_name: [
        '',
        [Validators.required, Validators.pattern(this.stringValidator)],
      ],
      fi_phone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern(this.phoneValidator),
        ],
      ],
      fi_email: ['', [Validators.required, Validators.email]],
      fi_job_title: [
        '',
        [Validators.required, Validators.pattern(this.stringValidator)],
      ],
      fi_former_eseo: ['', Validators.required],
      sa_last_name: [
        '',
        [Validators.required, Validators.pattern(this.stringValidator)],
      ],
      sa_first_name: [
        '',
        [Validators.required, Validators.pattern(this.stringValidator)],
      ],
      sa_phone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern(this.phoneValidator),
        ],
      ],
      sa_email: ['', [Validators.required, Validators.email]],
      sa_job_title: [
        '',
        [Validators.required, Validators.pattern(this.stringValidator)],
      ],
      sa_former_eseo: ['', Validators.required],
    });
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
    this.companyUserService.getById(this.authService.userValue.id).subscribe({
      next: (compUser) => {
        this.compUser = compUser;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.isOptional = false;
    this.fromDialog = 'I am from dialog land...';
  }

  private async getCompanyUser(): Promise<CompanyUser> {
    return await lastValueFrom(
      this.companyUserService.getById(this.authService.userValue.id)
    );
  }

  ngOnInit(): void {
    if (this.compUser.company_siret != 0) {
      this.getCompany(this.compUser.company_siret);
    }
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close', data: this.fromDialog });
  }

  addCompany(company: Company) {
    this.companyService.add(company).subscribe({
      next: (companyData) => {
        this._snackBar.open('✔ Données entreprise enregistrées', 'Ok', {
          duration: 2000,
        });
        this.opcoForm.patchValue({ opco_cmp_siret: companyData.cmp_siret });
        this.contactForm.patchValue({ ct_cmp_siret: companyData.cmp_siret });

        this.compUser.company_siret = company.cmp_siret;
        this.updateCompanyUser(this.compUser);
      },
      error: (err) => {
        console.log(err);
        this._snackBar.open('❌ Une erreur est survenue', 'Ok', {
          duration: 2000,
        });
      },
    });
  }

  getCompany(id: number) {
    this.companyService.get(id).subscribe({
      next: (company) => {
        this.enterpriseForm.patchValue({
          cmp_name: company.cmp_name,
          cmp_siret: company.cmp_siret,
          cmp_employees: company.cmp_employees,
          cmp_cpne: company.cmp_cpne,
          cmp_idcc: company.cmp_idcc,
          cmp_convention: company.cmp_convention,
          cmp_naf_ape: company.cmp_naf_ape,
          cmp_work_field: company.cmp_work_field,
          cmp_phone: company.cmp_phone,
          cmp_email: company.cmp_email,
          cmp_address: company.cmp_address,
          cmp_internat: company.cmp_internat,
        });
      },
      error: (err) => {
        console.log(err);
        this._snackBar.open('❌ Une erreur est survenue', 'Ok', {
          duration: 2000,
        });
      },
    });
  }

  public addOpco(opco: Opco) {
    this.opcoService.add(opco).subscribe({
      next: (v) => {
        this._snackBar.open('✔ Données OPCO enregistrées', 'Ok', {
          duration: 2000,
        });
        this.compUser.opco_siret = opco.opco_siret;
        this.updateCompanyUser(this.compUser);
      },

      error: (err) => {
        console.log(err);
        this._snackBar.open('❌ Une erreur est survenue', 'Ok', {
          duration: 2000,
        });
      },
    });
  }

  public addContact(contact: ContactCompany) {
    this.contactCompanyService.add(contact).subscribe({
      next: (v) => {
        this._snackBar.open('✔ Données des contacts enregistrées', 'Ok', {
          duration: 2000,
        });
        this.compUser.contactCompany_id = contact.ct_cmp_siret;
        this.updateCompanyUser(this.compUser);
      },
      error: (err) => {
        console.log(err);
        this._snackBar.open('❌ Une erreur est survenue', 'Ok', {
          duration: 2000,
        });
      },
    });
  }

  public updateCompanyUser(compUser: CompanyUser) {
    this.companyUserService.update(compUser).subscribe({
      next: (v) => {
        this._snackBar.open('✔ Données sauvegardées', 'Ok', {
          duration: 2000,
        });
      },
      error: (err) => {
        console.log(err);
        this._snackBar.open('❌ Une erreur est survenue', 'Ok', {
          duration: 2000,
        });
      },
    });
  }
}
