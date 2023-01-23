import { Component } from '@angular/core';
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
import { Role } from '@app/helpers';
import { RegexService } from '@app/services/regex/regex.service';

@Component({
  selector: 'app-add-company-form',
  templateUrl: './add-company-form.component.html',
  styleUrls: ['./add-company-form.component.scss'],
})
export class AddCompanyFormComponent {
  public enterpriseForm: FormGroup;
  public opcoForm: FormGroup;
  public contactForm: FormGroup;
  public compUser: CompanyUser;
  private hlCompany = false;
  private hlOpco = false;
  private hlContact = false;

  public isFormerESEO: string[] = ['Oui', 'Non'];
  public stageInternat: string[] = ['Lu et approuvé'];
  public isOptional = false;

  //Regex validator
  constructor(
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private companyService: CompanyService,
    private opcoService: OpcoService,
    private contactCompanyService: ContactCompanyService,
    private authService: AuthService,
    private companyUserService: CompanyUserService,
    private regexService: RegexService
  ) {
    this.enterpriseForm = this._formBuilder.group({
      cmp_name: [
        '',
        [
          Validators.required,
          Validators.pattern(this.regexService.stringValidator()),
        ],
      ],
      cmp_siret: [
        '',
        [
          Validators.required,
          Validators.pattern(this.regexService.numberOnlyValidator()),
        ],
      ],
      cmp_employees: [
        '',
        [
          Validators.required,
          Validators.pattern(this.regexService.numberOnlyValidator()),
        ],
      ],
      cmp_cpne: ['', [Validators.required]],
      cmp_idcc: [
        '',
        [
          Validators.required,
          Validators.pattern(this.regexService.numberOnlyValidator()),
        ],
      ],
      cmp_convention: ['', Validators.required],
      cmp_naf_ape: ['', [Validators.required]],
      cmp_work_field: ['', Validators.required],
      cmp_phone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern(this.regexService.phoneValidator()),
        ],
      ],
      cmp_email: ['', [Validators.required, Validators.email]],
      cmp_address: ['', Validators.required],
      cmp_internat: ['', Validators.required],
    });

    this.opcoForm = this._formBuilder.group({
      opco_cmp_siret: [
        '',
        [
          Validators.required,
          Validators.pattern(this.regexService.numberOnlyValidator()),
        ],
      ],
      opco_name: [
        '',
        [
          Validators.required,
          Validators.pattern(this.regexService.stringValidator()),
        ],
      ],
      opco_siret: [
        '',
        [
          Validators.required,
          Validators.pattern(this.regexService.numberOnlyValidator()),
        ],
      ],
      opco_address: ['', Validators.required],
      opco_phone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern(this.regexService.phoneValidator()),
        ],
      ],
      opco_email: ['', [Validators.required, Validators.email]],
    });

    this.contactForm = this._formBuilder.group({
      ct_cmp_siret: [
        '',
        [
          Validators.required,
          Validators.pattern(this.regexService.numberOnlyValidator()),
        ],
      ],
      ct_last_name: [
        '',
        [
          Validators.required,
          Validators.pattern(this.regexService.stringValidator()),
        ],
      ],
      ct_first_name: [
        '',
        [
          Validators.required,
          Validators.pattern(this.regexService.stringValidator()),
        ],
      ],
      ct_phone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern(this.regexService.phoneValidator()),
        ],
      ],
      ct_email: ['', [Validators.required, Validators.email]],
      ct_job_title: [
        '',
        [
          Validators.required,
          Validators.pattern(this.regexService.stringValidator()),
        ],
      ],
      ct_former_eseo: ['', Validators.required],
      fi_last_name: [
        '',
        [
          Validators.required,
          Validators.pattern(this.regexService.stringValidator()),
        ],
      ],
      fi_first_name: [
        '',
        [
          Validators.required,
          Validators.pattern(this.regexService.stringValidator()),
        ],
      ],
      fi_phone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern(this.regexService.phoneValidator()),
        ],
      ],
      fi_email: ['', [Validators.required, Validators.email]],
      fi_job_title: [
        '',
        [
          Validators.required,
          Validators.pattern(this.regexService.stringValidator()),
        ],
      ],
      fi_former_eseo: ['', Validators.required],
      sa_last_name: [
        '',
        [
          Validators.required,
          Validators.pattern(this.regexService.stringValidator()),
        ],
      ],
      sa_first_name: [
        '',
        [
          Validators.required,
          Validators.pattern(this.regexService.stringValidator()),
        ],
      ],
      sa_phone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern(this.regexService.phoneValidator()),
        ],
      ],
      sa_email: ['', [Validators.required, Validators.email]],
      sa_job_title: [
        '',
        [
          Validators.required,
          Validators.pattern(this.regexService.stringValidator()),
        ],
      ],
      sa_former_eseo: ['', Validators.required],
    });
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
    this.getCompanyUser(this.authService.userValue.id);
    this.isOptional = false;
  }

  // COMPANY
  addCompany(company: Company) {
    if (this.hlCompany) {
      this.companyService.update(company).subscribe({
        next: (companyData) => {
          this._snackBar.open('✔ Données entreprise sauvegardées', 'Ok', {
            duration: 2000,
          });
          this.opcoForm.patchValue({ opco_cmp_siret: companyData.cmp_siret });
          this.contactForm.patchValue({ ct_cmp_siret: companyData.cmp_siret });
        },
        error: (err) => {
          console.log(err);
          this._snackBar.open('❌ Une erreur est survenue', 'Ok', {
            duration: 2000,
          });
        },
      });
    } else {
      this.companyService.add(company).subscribe({
        next: (companyData) => {
          this._snackBar.open('✔ Données entreprise enregistrées', 'Ok', {
            duration: 2000,
          });
          this.opcoForm.patchValue({ opco_cmp_siret: companyData.cmp_siret });
          this.contactForm.patchValue({ ct_cmp_siret: companyData.cmp_siret });

          this.compUser.company_siret = companyData.cmp_siret;
          this.updateCompanyUser(this.compUser);
          console.log(this.compUser);
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

  public getCompany(id: string) {
    this.companyService.getById(id).subscribe({
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
        this.hlCompany = true;
      },
      error: (err) => {
        console.log(err);
        this._snackBar.open('❌ Une erreur est survenue', 'Ok', {
          duration: 2000,
        });
      },
    });
  }

  // OPCO
  public addOpco(opco: Opco) {
    if (this.hlOpco) {
      this.opcoService.update(opco).subscribe({
        next: (op) => {
          this._snackBar.open('✔ Données OPCO sauvegardées', 'Ok', {
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
    } else {
      this.opcoService.add(opco).subscribe({
        next: (op) => {
          this._snackBar.open('✔ Données OPCO enregistrées', 'Ok', {
            duration: 2000,
          });
          this.compUser.opco_siret = op.opco_siret;
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
  }

  public getOpco(id: string) {
    this.opcoService.getById(id).subscribe({
      next: (opco) => {
        this.opcoForm.patchValue({
          opco_cmp_siret: opco.opco_cmp_siret,
          opco_name: opco.opco_name,
          opco_siret: opco.opco_siret,
          opco_address: opco.opco_address,
          opco_phone: opco.opco_phone,
          opco_email: opco.opco_email,
        });
        this.hlOpco = true;
      },
      error: (err) => {
        console.log(err);
        this._snackBar.open('❌ Une erreur est survenue', 'Ok', {
          duration: 2000,
        });
      },
    });
  }

  // CONTACT COMPANY
  public addContact(contact: ContactCompany) {
    if (this.hlContact) {
      this.contactCompanyService.update(contact).subscribe({
        next: (v) => {
          this._snackBar.open('✔ Données des contacts sauvegardées', 'Ok', {
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
    } else {
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
  }

  public getContactCompany(id: string) {
    this.contactCompanyService.getById(id).subscribe({
      next: (contact) => {
        this.contactForm.patchValue({
          ct_cmp_siret: contact.ct_cmp_siret,
          ct_last_name: contact.ct_last_name,
          ct_first_name: contact.ct_first_name,
          ct_phone: contact.ct_phone,
          ct_email: contact.ct_email,
          ct_job_title: contact.ct_job_title,
          ct_former_eseo: contact.ct_former_eseo,
          fi_last_name: contact.fi_last_name,
          fi_first_name: contact.fi_first_name,
          fi_phone: contact.fi_phone,
          fi_email: contact.fi_email,
          fi_job_title: contact.fi_job_title,
          fi_former_eseo: contact.fi_former_eseo,
          sa_last_name: contact.sa_last_name,
          sa_first_name: contact.sa_first_name,
          sa_phone: contact.sa_phone,
          sa_email: contact.sa_email,
          sa_job_title: contact.sa_job_title,
          sa_former_eseo: contact.sa_former_eseo,
        });
        this.hlContact = true;
      },
      error: (err) => {
        console.log(err);
        this._snackBar.open('❌ Une erreur est survenue', 'Ok', {
          duration: 2000,
        });
      },
    });
  }

  // COMPANY USER
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

  public getCompanyUser(id: number) {
    this.companyUserService.getById(id).subscribe({
      next: (user) => {
        this.compUser = user;
        if (this.compUser.company_siret != null) {
          this.getCompany(this.compUser.company_siret);
          this.opcoForm.patchValue({
            opco_cmp_siret: this.compUser.company_siret,
          });
          this.contactForm.patchValue({
            ct_cmp_siret: this.compUser.company_siret,
          });
        }
        if (this.compUser.opco_siret != null) {
          this.getOpco(this.compUser.opco_siret);
        }
        if (this.compUser.contactCompany_id != null) {
          this.getContactCompany(this.compUser.contactCompany_id);
        }
      },
      error: (err) => {},
    });
  }
}
