import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '@app/models/User';
import { AuthService } from '@app/services/auth/auth.service';
import { EvaluationService } from '@app/services/evaluation/evaluation.service';
import { YearGroup } from 'src/app/models/YearGroup';
import { YearGroupService } from 'src/app/services/year-group/year-group.service';
import { ApprenticeService } from '@app/services/apprentice/apprentice.service';

@Component({
  selector: 'app-add-evaluation-popup',
  templateUrl: './add-evaluation-popup.component.html',
  styleUrls: ['./add-evaluation-popup.component.scss'],
})
export class AddEvaluationPopupComponent {
  public user: User;
  public owner: User;
  public selectedFile: any = null;
  private formData = new FormData();
  private file_name: any;
  public addEvaluationForm: FormGroup;
  public submitted: boolean = false;
  public yearGroup: YearGroup;

  public status: any[] = [
    { name: 'Brouillon', value: 'Brouillon' },
    { name: 'Validé', value: 'Validé' },
    { name: 'Refusé', value: 'Refusé' },
    { name: 'Déposé', value: 'Déposé' },
  ];

  public type: any[] = [
    { name: 'S5 - Fiche de synthèse', value: 'S5 - Fiche de synthèse' },
    { name: 'S6 - Fiche de synthèse', value: 'S6 - Fiche de synthèse' },
    {
      name: 'S6 - Rapport de conduite de projet',
      value: 'S6 - Rapport de conduite de projet',
    },
    { name: 'S7 - Fiche de synthèse', value: 'S7 - Fiche de synthèse' },
    {
      name: 'S7 - Rapport de synthèse version initiale',
      value: 'S7 - Rapport de synthèse version initiale',
    },
    {
      name: 'S7 - Rapport de synthèse version finale',
      value: 'S7 - Rapport de synthèse version finale',
    },
    { name: 'S7 - Support de soutenance', value: 'S7 - Support de soutenance' },
    { name: 'S8 - Fiche de synthèse', value: 'S8 - Fiche de synthèse' },
    { name: 'S8 - Rapport sujet PING', value: 'S8 - Rapport sujet PING' },
    { name: 'S8 - Support de soutenance', value: 'S8 - Support de soutenance' },
    { name: 'S9 - Fiche de synthèse', value: 'S9 - Fiche de synthèse' },
    { name: 'S9 - Support de soutenance', value: 'S9 - Support de soutenance' },
    { name: 'S10 - Fiche de synthèse', value: 'S10 - Fiche de synthèse' },
    { name: 'S10 - Rapport pré final', value: 'S10 - Rapport pré final' },
    { name: 'S10 - Rapport PING', value: 'S10 - Rapport PING' },
  ];

  constructor(
    public dialogRef: MatDialogRef<AddEvaluationPopupComponent>,
    private yearGroupService: YearGroupService,
    private evaluationService: EvaluationService,
    private apprenticeService: ApprenticeService,
    private _snackBar: MatSnackBar,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.user = this.authService.userValue;
    this.owner = this.authService.userValue;
    this.yearGroup = this.getYearGroupUser();
    this.addEvaluationForm = this.formBuilder.group({
      status: ['', Validators.required],
      type: ['', Validators.required],
      pdf: ['', Validators.required],
    });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close' });
  }

  private getYearGroupUser() {
    this.apprenticeService.getById(this.user.id).subscribe((apprentice) => {
      this.yearGroup = apprentice.yearGroup;
      });
      return this.yearGroup;
  }

  public addEvaluation() {
    this.submitted = true;
    if (this.addEvaluationForm.valid) {
      this.formData.append('file', this.selectedFile);
      this.formData.append('file_name', this.file_name);
      this.formData.append('modification_date', new Date().toISOString());
      this.formData.append('status', this.addEvaluationForm.value.status);
      this.formData.append('type', this.addEvaluationForm.value.type);
      this.formData.append('user', this.user.id.toString());
      this.formData.append('owner', this.owner.id.toString());
      this.formData.append('yearGroup', this.yearGroup.id.toString());
      this.formData.append('link', this.addEvaluationForm.value.link);
      this.evaluationService.add(this.formData).subscribe({
        next: (v) => {
          this._snackBar.open('✔ Livrable ajouté', 'Ok', { duration: 2000 });
          this.closeDialog();
        },
        error: (err) => {
          this._snackBar.open(
            "❌ Une erreur est survenue lors de l'ajout du livrable. Un fichier du même nom existe déjà, veuillez ajouter un fichier avec un nom unique",
            'Ok',
            {
              duration: 5000,
            }
          );
        },
      });
    }
  }

  public onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
    this.file_name = this.selectedFile.name;
  }
}
