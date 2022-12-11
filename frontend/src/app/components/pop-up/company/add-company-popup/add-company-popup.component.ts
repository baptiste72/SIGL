import { Component, Inject, OnInit, Optional, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CompanyService } from 'src/app/services/company/company.service';
import { HttpHeaders } from '@angular/common/http';
import { OpcoService } from '@app/services/opco/opco.service';
import { ContactCompanyService } from '@app/services/contact-company/contact-company.service';
import { MentorService } from '@app/services/mentor/mentor.service';

@Component({
  selector: 'app-add-company-popup',
  templateUrl: './add-company-popup.component.html',
  styleUrls: ['./add-company-popup.component.scss']
})
export class AddCompanyPopupComponent implements OnInit {
  fromPage!: string;
  fromDialog!: string;

  enterpriseForm!: FormGroup;
  opcoForm!: FormGroup;
  contactForm!: FormGroup;
  mentorForm!: FormGroup;
  apprenticeForm!: FormGroup;

  isFormerESEO: string[] = ['Oui', 'Non'];
  stageInternat: string[] = ['Lu et approuvé'];
  isOptional = false;

  //Regex validator
  phoneValidator = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
  stringValidator = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
  numberOnlyValidator = /^\d+$/;


  constructor(public dialogRef: MatDialogRef<AddCompanyPopupComponent>,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private companyService: CompanyService,
    private opcoService: OpcoService,
    private contactCompanyService: ContactCompanyService,
    private mentorService: MentorService,

    @Optional() @Inject(MAT_DIALOG_DATA) public mydata: any
    ) { }



  ngOnInit(): void {

    this.isOptional = false;
    this.fromDialog = "I am from dialog land...";

    this.enterpriseForm = this._formBuilder.group({
      cmp_name:        ['Soco',[Validators.required, Validators.pattern(this.stringValidator)]],
      cmp_siret:       ['1234',[Validators.required, Validators.pattern(this.numberOnlyValidator)]],
      cmp_employees:   ['222',[Validators.required, Validators.pattern(this.numberOnlyValidator)]],
      cmp_cpne:        ['333',[Validators.required]],
      cmp_idcc:        ['111',[Validators.required, Validators.pattern(this.numberOnlyValidator)]],
      cmp_convention:  ['555',Validators.required],
      cmp_naf_ape:     ['666',[Validators.required]],
      cmp_work_field:  ['Metal',Validators.required],
      cmp_phone:       ['0630781510',[Validators.required, Validators.minLength(10), Validators.pattern(this.phoneValidator)]],
      cmp_email:       ['jojo@jojo.com',[Validators.required, Validators.email]],
      cmp_address:     ['213 rue tutu',Validators.required],
      cmp_internat:    ['',Validators.required],
    });

    this.opcoForm = this._formBuilder.group({
      opco_name:        ['nomOp',[Validators.required, Validators.pattern(this.stringValidator)]],
      opco_siret:       ['567',[Validators.required, Validators.pattern(this.numberOnlyValidator)]],
      opco_address:     ['444 rue dia',Validators.required],
      opco_phone:       ['0909090909',[Validators.required, Validators.minLength(10), Validators.pattern(this.phoneValidator)]],
      opco_email:       ['Soco@dd.fr',[Validators.required, Validators.email]],
    });

    this.contactForm = this._formBuilder.group({
      ct_last_name:     ['nomC',[Validators.required, Validators.pattern(this.stringValidator)]],
      ct_first_name:    ['prenomC',[Validators.required, Validators.pattern(this.stringValidator)]],
      ct_phone:         ['1234567891',[Validators.required, Validators.minLength(10), Validators.pattern(this.phoneValidator)]],
      ct_email:         ['aa@test.cpm',[Validators.required, Validators.email]],
      ct_job_title:     ['boulanger',[Validators.required, Validators.pattern(this.stringValidator)]],
      ct_former_eseo:   ['Oui',Validators.required],
      fi_last_name:     ['nomF',[Validators.required, Validators.pattern(this.stringValidator)]],
      fi_first_name:    ['prenomF',[Validators.required, Validators.pattern(this.stringValidator)]],
      fi_phone:         ['1111',[Validators.required, Validators.minLength(10), Validators.pattern(this.phoneValidator)]],
      fi_email:         ['zz@ee.com',[Validators.required, Validators.email]],
      fi_job_title:     ['Garagiste',[Validators.required, Validators.pattern(this.stringValidator)]],
      fi_former_eseo:   ['Oui',Validators.required],
      sa_last_name:     ['nomS',[Validators.required, Validators.pattern(this.stringValidator)]],
      sa_first_name:    ['prenomS',[Validators.required, Validators.pattern(this.stringValidator)]],
      sa_phone:         ['22222',[Validators.required, Validators.minLength(10), Validators.pattern(this.phoneValidator)]],
      sa_email:         ['sa@sa.com',[Validators.required, Validators.email]],
      sa_job_title:     ['Peintre',[Validators.required, Validators.pattern(this.stringValidator)]],
      sa_former_eseo:   ['',Validators.required],
    });

    this.mentorForm = this._formBuilder.group({
      mt_last_name:     ['LACREUSE',[Validators.required, Validators.pattern(this.stringValidator)]],
      mt_first_name:    ['Guillaume',[Validators.required, Validators.pattern(this.stringValidator)]],
      mt_phone:         ['0000000000',[Validators.required, Validators.minLength(10), Validators.pattern(this.phoneValidator)]],
      mt_email:         ['guigui@soco.com',[Validators.required, Validators.email]],
      mt_job_title:     ['Le boss',[Validators.required, Validators.pattern(this.stringValidator)]],
      mt_last_diploma:  ['CAP chaudronerie',Validators.required],
      mt_former_eseo:   ['Oui',Validators.required],
    });

    this.apprenticeForm = this._formBuilder.group({
      app_last_name:              ['heck',[Validators.required, Validators.pattern(this.stringValidator)]],
      app_first_name:             ['jojo',[Validators.required, Validators.pattern(this.stringValidator)]],
      app_job_title:              ['boss',[Validators.required, Validators.pattern(this.stringValidator)]],
      app_description:            ['oui',Validators.required],
      app_phone:                  ['666',[Validators.required, Validators.minLength(10), Validators.pattern(this.phoneValidator)]],
      app_collective_convention:  ['123',Validators.required],
      app_working_hours:          ['35',[Validators.required, Validators.pattern(this.numberOnlyValidator)]],
      app_comp_name:              [''],
      app_siret:                  [''],
      app_location:               [''],
    });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close', data: this.fromDialog });
  }


  addCompany(data: any) {
    //let serializedForm = JSON.stringify(data.getRawValue());
    let serializedForm = JSON.stringify(data.value);
    console.log(serializedForm);
    this.companyService.add(serializedForm).subscribe({
      next: (v) => {
        this._snackBar.open('✔ Données entreprise enregistrées', 'Ok', { duration: 2000 });
        this.closeDialog();
      },
      error: (err) => {
        console.log(err);
        this._snackBar.open('❌ Une erreur est survenue', 'Ok', {
          duration: 2000,
        });
      },
    });
  }

  public addOpco(data: any) {
    //let serializedForm = JSON.stringify(data.getRawValue());
    let serializedOpcoForm = JSON.stringify(data.value);
    console.log(serializedOpcoForm);
    this.opcoService.add(serializedOpcoForm).subscribe({
      next: (v) => {
        this._snackBar.open('✔ Données OPCO enregistrées', 'Ok', { duration: 2000 });
        this.closeDialog();
      },
      error: (err) => {
        console.log(err);
        this._snackBar.open('❌ Une erreur est survenue', 'Ok', {
          duration: 2000,
        });
      },
    });
  }

  public addContact(data: any) {
    //let serializedForm = JSON.stringify(data.getRawValue());
    let serializedContactForm = JSON.stringify(data.value);
    console.log(serializedContactForm);
    this.contactCompanyService.add(serializedContactForm).subscribe({
      next: (v) => {
        this._snackBar.open('✔ Données des contacts enregistrées', 'Ok', { duration: 2000 });
        this.closeDialog();
      },
      error: (err) => {
        console.log(err);
        this._snackBar.open('❌ Une erreur est survenue', 'Ok', {
          duration: 2000,
        });
      },
    });
  }

  public addMentor(data: any) {
    let serializedMentorForm = JSON.stringify(data.value);
    console.log(serializedMentorForm);
    this.mentorService.add(serializedMentorForm).subscribe({
      next: (v) => {
        this._snackBar.open('✔ Données des contacts enregistrées', 'Ok', { duration: 2000 });
        this.closeDialog();
      },
      error: (err) => {
        console.log(err);
        this._snackBar.open('❌ Une erreur est survenue', 'Ok', {
          duration: 2000,
        });
      },
    });
  }

  public addApprenticeInfo(form: FormGroup) {

  }

  //For tests
  public sendJSON(data: any) {
    console.log(data);
  }
  public printFormValidity(form: FormGroup) {
    console.log("Is the form invalid :",form.invalid);
  }
}
