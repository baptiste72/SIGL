import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '@app/models/User';
import { AuthService } from '@app/services/auth/auth.service';
import { EvaluationService } from '@app/services/evaluation/evaluation.service';
import { Evaluation } from '@app/models/Evaluation';
import { UpdateEvaluationPopupComponent } from '../update-evaluation-popup/update-evaluation-popup.component';

@Component({
  selector: 'app-note-evaluation-popup',
  templateUrl: './note-evaluation-popup.component.html',
  styleUrls: ['./note-evaluation-popup.component.scss'],
})
export class NoteEvaluationPopupComponent {
  public user: User;
  public selectedFile: any = null;
  private formData = new FormData();
  private file_name: any;
  public note: any;
  public noteEvaluationForm: FormGroup;
  public submitted: boolean = false;

  public status: any[] = [
    { name: 'Brouillon', value: 'Brouillon' },
    { name: 'Validé', value: 'Validé' },
    { name: 'Refusé', value: 'Refusé' },
    { name: 'Déposé', value: 'Déposé' },
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
    this.noteEvaluationForm = this.formBuilder.group({
      status: [this.data.status, Validators.required],
      note: [this.data.note, Validators.required],
    });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close' });
  }

  public updateNoteEvaluation() {
    this.submitted = true;
    if (this.noteEvaluationForm.valid) {
      this.formData.append('file_name', this.file_name);
      this.formData.append('modification_date', new Date().toISOString());
      this.formData.append('status', this.noteEvaluationForm.value.status);
      this.formData.append(
        'note',
        this.noteEvaluationForm.value.note.toString()
      );
      this.formData.append('type', this.data.type);
      this.formData.append('user', this.user.id.toString());
      this.evaluationService.update(this.formData, this.data.id).subscribe({
        next: (v) => {
          this._snackBar.open('✔ Livrable modifié', 'Ok', { duration: 2000 });
          this.closeDialog();
        },
        error: (err) => {
          this._snackBar.open(
            "❌ Une erreur est survenue lors de l'ajout de la note du livrable, elle doit être comprise entre 0 et 20",
            'Ok',
            {
              duration: 4000,
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
