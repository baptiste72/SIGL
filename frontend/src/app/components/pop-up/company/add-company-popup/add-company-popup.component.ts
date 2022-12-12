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
import { CompanyUserCompanyInfoAssociation } from '@app/models/CompanyUserCompanyInfoAssociation';
import { CompanyUserCompanyInfoService } from '@app/services/company-user-company-info/company-user-company-info.service';

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
  association: CompanyUserCompanyInfoAssociation;

  isFormerESEO: string[] = ['Oui', 'Non'];
  stageInternat: string[] = ['Lu et approuvé'];
  isOptional = false;

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
    private companyInfoService: CompanyUserCompanyInfoService,

    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any
  ) {
    this.enterpriseForm = this._formBuilder.group({
      cmp_name: [
        'Soco',
        [Validators.required, Validators.pattern(this.stringValidator)],
      ],
      cmp_siret: [
        '1234',
        [Validators.required, Validators.pattern(this.numberOnlyValidator)],
      ],
      cmp_employees: [
        '222',
        [Validators.required, Validators.pattern(this.numberOnlyValidator)],
      ],
      cmp_cpne: ['333', [Validators.required]],
      cmp_idcc: [
        '111',
        [Validators.required, Validators.pattern(this.numberOnlyValidator)],
      ],
      cmp_convention: ['555', Validators.required],
      cmp_naf_ape: ['666', [Validators.required]],
      cmp_work_field: ['Metal', Validators.required],
      cmp_phone: [
        '0630781510',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern(this.phoneValidator),
        ],
      ],
      cmp_email: ['jojo@jojo.com', [Validators.required, Validators.email]],
      cmp_address: ['213 rue tutu', Validators.required],
      cmp_internat: ['', Validators.required],
    });

    this.opcoForm = this._formBuilder.group({
      opco_cmp_siret: [
        '',
        [Validators.required, Validators.pattern(this.numberOnlyValidator)],
      ],
      opco_name: [
        'nomOp',
        [Validators.required, Validators.pattern(this.stringValidator)],
      ],
      opco_siret: [
        '567',
        [Validators.required, Validators.pattern(this.numberOnlyValidator)],
      ],
      opco_address: ['444 rue dia', Validators.required],
      opco_phone: [
        '0909090909',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern(this.phoneValidator),
        ],
      ],
      opco_email: ['Soco@dd.fr', [Validators.required, Validators.email]],
    });

    this.contactForm = this._formBuilder.group({
      ct_cmp_siret: [
        '',
        [Validators.required, Validators.pattern(this.numberOnlyValidator)],
      ],
      ct_last_name: [
        'nomC',
        [Validators.required, Validators.pattern(this.stringValidator)],
      ],
      ct_first_name: [
        'prenomC',
        [Validators.required, Validators.pattern(this.stringValidator)],
      ],
      ct_phone: [
        '1234567891',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern(this.phoneValidator),
        ],
      ],
      ct_email: ['aa@test.cpm', [Validators.required, Validators.email]],
      ct_job_title: [
        'boulanger',
        [Validators.required, Validators.pattern(this.stringValidator)],
      ],
      ct_former_eseo: ['Oui', Validators.required],
      fi_last_name: [
        'nomF',
        [Validators.required, Validators.pattern(this.stringValidator)],
      ],
      fi_first_name: [
        'prenomF',
        [Validators.required, Validators.pattern(this.stringValidator)],
      ],
      fi_phone: [
        '1111',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern(this.phoneValidator),
        ],
      ],
      fi_email: ['zz@ee.com', [Validators.required, Validators.email]],
      fi_job_title: [
        'Garagiste',
        [Validators.required, Validators.pattern(this.stringValidator)],
      ],
      fi_former_eseo: ['Oui', Validators.required],
      sa_last_name: [
        'nomS',
        [Validators.required, Validators.pattern(this.stringValidator)],
      ],
      sa_first_name: [
        'prenomS',
        [Validators.required, Validators.pattern(this.stringValidator)],
      ],
      sa_phone: [
        '22222',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern(this.phoneValidator),
        ],
      ],
      sa_email: ['sa@sa.com', [Validators.required, Validators.email]],
      sa_job_title: [
        'Peintre',
        [Validators.required, Validators.pattern(this.stringValidator)],
      ],
      sa_former_eseo: ['', Validators.required],
    });

    this.association = new CompanyUserCompanyInfoAssociation(
      this.authService.userValue.id,
      0,
      0,
      0
    );

    this.isOptional = false;
    this.fromDialog = 'I am from dialog land...';
  }

  ngOnInit(): void {
    console.log(this.authService.userValue.id);
    if (this.companyService.getById(this.authService.userValue.id)) {
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
        this.association.company_siret = company.cmp_siret;
        this.addCompanyUserCompanyInfoAssociation(this.association);
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
        this.association.opco_siret = opco.opco_siret;
        this.updateCompanyUserCompanyInfoAssociation(this.association);
      },

      error: (err) => {
        console.log(err);
        this._snackBar.open('❌ Une erreur est survenue', 'Ok', {
          duration: 2000,
        });
      },
    });
  }

  public addCompanyUserCompanyInfoAssociation(
    association: CompanyUserCompanyInfoAssociation
  ) {
    this.companyInfoService.add(association).subscribe({
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

  public updateCompanyUserCompanyInfoAssociation(
    association: CompanyUserCompanyInfoAssociation
  ) {
    this.companyInfoService.update(association).subscribe({
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

  public addContact(contact: ContactCompany) {
    this.contactCompanyService.add(contact).subscribe({
      next: (v) => {
        this._snackBar.open('✔ Données des contacts enregistrées', 'Ok', {
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
