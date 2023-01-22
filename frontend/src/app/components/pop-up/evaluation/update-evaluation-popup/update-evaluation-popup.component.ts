import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '@app/models/User';
import { AuthService } from '@app/services/auth/auth.service';
import { EvaluationService } from '@app/services/evaluation/evaluation.service';
import { Evaluation } from '@app/models/Evaluation';

@Component({
  selector: 'app-update-evaluation-popup',
  templateUrl: './update-evaluation-popup.component.html',
  styleUrls: ['./update-evaluation-popup.component.scss'],
})
export class UpdateEvaluationPopupComponent {
  public user: User;
  public selectedFile: any = null;
  private formData = new FormData();
  private file_name: any;
  public updateEvaluationForm: FormGroup;
  public submitted: boolean = false;

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
    public dialogRef: MatDialogRef<UpdateEvaluationPopupComponent>,
    private evaluationService: EvaluationService,
    private _snackBar: MatSnackBar,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Evaluation
  ) {
    this.user = this.authService.userValue;
    this.updateEvaluationForm = this.formBuilder.group({
      status: [this.data.status, Validators.required],
      type: [this.data.type, Validators.required],
    });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close' });
  }

  updateEvaluation() {
    this.submitted = true;
    if (this.updateEvaluationForm.valid) {
      this.formData.append('file_name', this.file_name);
      this.formData.append('modification_date', new Date().toISOString());
      this.formData.append('status', this.updateEvaluationForm.value.status);
      this.formData.append('type', this.updateEvaluationForm.value.type);
      this.formData.append('user', this.user.id.toString());
      this.evaluationService.update(this.formData, this.data.id).subscribe({
        next: (v) => {
          this._snackBar.open('✔ Livrable modifié', 'Ok', { duration: 2000 });
          this.closeDialog();
        },
        error: (err) => {
          this._snackBar.open(
            '❌ Une erreur est survenue lors de la modification du livrable',
            'Ok',
            {
              duration: 2000,
            }
          );
        },
      });
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
    this.file_name = this.selectedFile.name;
  }
}
