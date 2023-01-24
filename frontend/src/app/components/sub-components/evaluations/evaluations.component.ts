import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDeleteComponent } from '@app/components/pop-up/confirm-delete/confirm-delete.component';
import { AddEvaluationPopupComponent } from '@app/components/pop-up/evaluation/add-evaluation-popup/add-evaluation-popup.component';
import { UpdateEvaluationPopupComponent } from '@app/components/pop-up/evaluation/update-evaluation-popup/update-evaluation-popup.component';
import { Role } from '@app/helpers/utilities';
import { Evaluation } from '@app/models/Evaluation';
import { User } from '@app/models/User';
import { AuthService } from '@app/services';
import { EvaluationService } from '@app/services/evaluation/evaluation.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-evaluations',
  templateUrl: './evaluations.component.html',
  styleUrls: ['./evaluations.component.scss'],
})
export class EvaluationsComponent implements OnInit, OnChanges {
  @Input() apprenticeId;
  public user: User;
  readonly roleEnum = Role;
  public displayedColumns: string[] = [
    'link',
    'name',
    'modify-time',
    'modify-by',
    'status',
    'evaluation-name',
    'owner',
    'promotion',
    'note',
  ];
  dataSource: any;
  @ViewChild('documentPaginator') documentPaginator!: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private evaluationService: EvaluationService,
    private _snackBar: MatSnackBar,
    private confirmDeleteDialogRef: MatDialogRef<ConfirmDeleteComponent>,
    private authService: AuthService
  ) {
    this.dataSource = new MatTableDataSource<Evaluation>();
    this.user = this.authService.userValue;
  }

  ngOnInit() {
    this.apprenticeId = this.user.id;
    this.getEvaluations(this.apprenticeId);
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let change = changes[propName];
      this.getEvaluations(change.currentValue);
    }
  }

  public async deleteEvaluationById(id: any) {
    const shouldDelete = await this.openConfirmDeletePopup(
      'Souhaitez-vous vraiment supprimer ce livrable ?'
    );
    if (shouldDelete) {
      this.evaluationService.delete(id).subscribe({
        next: (v) => {
          this.getEvaluations(this.apprenticeId);
        },
        error: (err) => {
          this._snackBar.open(
            '❌ Une erreur est survenue lors de la suppression du livrable',
            'Ok',
            { duration: 2000 }
          );
        },
      });
    }
  }

  public openAddEvaluationPopup() {
    this.dialog
      .open(AddEvaluationPopupComponent, {
        width: '600px',
      })
      .afterClosed()
      .subscribe((shouldReload: boolean) => {
        this.getEvaluations(this.apprenticeId);
      });
  }

  public openUpdateEvaluationPopup(evaluation: any) {
    this.dialog
      .open(UpdateEvaluationPopupComponent, {
        width: '600px',
        data: evaluation,
      })
      .afterClosed()
      .subscribe((shouldReload: boolean) => {
        this.getEvaluations(this.apprenticeId);
      });
  }

  private getEvaluations(apprenticeId: number) {
    this.evaluationService.getByOwner(apprenticeId).subscribe({
      next: (evaluations) => {
        this.dataSource = new MatTableDataSource<Evaluation>(evaluations);
      },
      error: (err) => {
        this._snackBar.open(
          '❌ Une erreur est survenue lors de la récupération des livrables',
          'Ok',
          { duration: 2000 }
        );
      },
    });
  }

  public downloadEvaluation(id: number, file_name: string) {
    this.evaluationService.getById(id).subscribe({
      next: (evaluation) => {
        const url = window.URL.createObjectURL(evaluation);
        window.open(url);
        this.evaluationService.cleanup(file_name).subscribe();
      },
      error: (err) => {
        this._snackBar.open(
          '❌ Une erreur est survenue lors de la récupération du livrable',
          'Ok',
          { duration: 2000 }
        );
      },
    });
  }

  public async openConfirmDeletePopup(content: string): Promise<boolean> {
    this.confirmDeleteDialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '600px',
    });

    this.confirmDeleteDialogRef.componentInstance.content = content;

    return await lastValueFrom(this.confirmDeleteDialogRef.afterClosed());
  }
}
