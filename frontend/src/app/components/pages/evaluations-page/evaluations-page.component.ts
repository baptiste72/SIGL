import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDeleteComponent } from '@app/components/pop-up/confirm-delete/confirm-delete.component';
import { Evaluation } from '@app/models/Evaluation';
import { User } from '@app/models/User';
import { AuthService } from '@app/services';
import { lastValueFrom } from 'rxjs';
import { EvaluationService } from '@app/services/evaluation/evaluation.service';
import { AddEvaluationPopupComponent } from '@app/components/pop-up/evaluation/add-evaluation-popup/add-evaluation-popup.component';
import { Role } from '@app/helpers';
import { UpdateEvaluationPopupComponent } from '@app/components/pop-up/evaluation/update-evaluation-popup/update-evaluation-popup.component';

@Component({
  templateUrl: './evaluations-page.component.html',
  styleUrls: ['./evaluations-page.component.scss'],
})
export class EvaluationsPageComponent implements OnInit {
  public user: User;
  readonly roleEnum = Role;
  displayedColumns: string[] = [
    'name',
    'modify-time',
    'modify-by',
    'status',
    'evaluation-name',
    'owner',
    'promotion',
    'note',
    'link',
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

  ngOnInit(): void {
    this.getEvaluations();
  }

  openAddEvaluationPopup() {
    this.dialog
      .open(AddEvaluationPopupComponent, {
        width: '600px',
      })
      .afterClosed()
      .subscribe((shouldReload: boolean) => {
        this.getEvaluations();
      });
  }

  openUpdateEvaluationPopup(evaluation: any) {
    this.dialog
      .open(UpdateEvaluationPopupComponent, {
        width: '600px',
        data: evaluation,
      })
      .afterClosed()
      .subscribe((shouldReload: boolean) => {
        this.getEvaluations();
      });
  }

  private getEvaluations() {
    if (this.user.role == this.roleEnum.APPRENTICE) {
      this.evaluationService.getByOwner(this.user.id).subscribe({
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
    } else {
      this.evaluationService.getAll().subscribe({
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
  }

  downloadEvaluation(id: number, file_name: string) {
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

  public async deleteEvaluationById(id: any) {
    const shouldDelete = await this.openConfirmDeletePopup(
      'Souhaitez-vous vraiment supprimer ce livrable ?'
    );
    if (shouldDelete) {
      this.evaluationService.delete(id).subscribe({
        next: (v) => {
          this.getEvaluations();
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

  public async openConfirmDeletePopup(content: string): Promise<boolean> {
    this.confirmDeleteDialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '600px',
    });

    this.confirmDeleteDialogRef.componentInstance.content = content;

    return await lastValueFrom(this.confirmDeleteDialogRef.afterClosed());
  }
}
