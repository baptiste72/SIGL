import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddDocumentPopupComponent } from '../../pop-up/document/add-document-popup/add-document-popup.component';
import { DocumentService } from 'src/app/services/document/document.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDeleteComponent } from '@app/components/pop-up/confirm-delete/confirm-delete.component';
import { lastValueFrom, Observable } from 'rxjs';
import { DocumentPdf } from '@app/models/DocumentPdf';
import { AuthService } from '@app/services';
import { Role } from '@app/helpers';
import { User } from '@app/models/User';
import { Apprentice } from '@app/models/Apprentice';
import { ApprenticeService } from '@app/services/apprentice/apprentice.service';

@Component({
  templateUrl: './documents-page.component.html',
  styleUrls: ['./documents-page.component.scss'],
})
export class DocumentsPageComponent implements AfterViewInit, OnInit {
  public user: User;
  readonly roleEnum = Role;
  displayedColumns: string[] = [
    'name',
    'file_name',
    'user_first_name',
    'user_last_name',
    'yearGroup',
    'link',
  ];
  dataSource: any;
  @ViewChild('documentPaginator') documentPaginator!: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private documentService: DocumentService,
    private _snackBar: MatSnackBar,
    private confirmDeleteDialogRef: MatDialogRef<ConfirmDeleteComponent>,
    private authService: AuthService,
    private apprenticeService: ApprenticeService
  ) {
    this.dataSource = new MatTableDataSource<DocumentPdf>();
    this.user = this.authService.userValue;
  }

  ngOnInit(): void {
    this.getDocuments();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.documentPaginator;
  }

  openAddDocumentPopup() {
    this.dialog
      .open(AddDocumentPopupComponent, {
        width: '600px',
      })
      .afterClosed()
      .subscribe((shouldReload: boolean) => {
        this.getDocuments();
      });
  }

  private getDocuments() {
    if (this.user.role == this.roleEnum.APPRENTICE) {
      this.apprenticeService.getById(this.user.id).subscribe((apprentice) => {
        this.documentService.getByYearGroup(apprentice.yearGroup.id).subscribe({
          next: (documents) => {
            this.dataSource = new MatTableDataSource<DocumentPdf>(documents);
          },
          error: (err) => {
            this._snackBar.open(
              '❌ Une erreur est survenue lors de la récupération des documents',
              'Ok',
              { duration: 2000 }
            );
          },
        });
      });
    } else {
      this.documentService.getAll().subscribe({
        next: (documents) => {
          this.dataSource = new MatTableDataSource<DocumentPdf>(documents);
        },
        error: (err) => {
          this._snackBar.open(
            '❌ Une erreur est survenue lors de la récupération des documents',
            'Ok',
            { duration: 2000 }
          );
        },
      });
    }
  }

  downloadDocument(id: number, file_name: string) {
    this.documentService.getById(id).subscribe({
      next: (document) => {
        const url = window.URL.createObjectURL(document);
        window.open(url);
        this.documentService.cleanup(file_name).subscribe();
      },
      error: (err) => {
        this._snackBar.open(
          '❌ Une erreur est survenue lors de la récupération des documents',
          'Ok',
          { duration: 2000 }
        );
      },
    });
  }

  public async deleteDocumentById(id: any) {
    const shouldDelete = await this.openConfirmDeletePopup(
      'Souhaitez-vous vraiment supprimer ce document ?'
    );
    if (shouldDelete) {
      this.documentService.delete(id).subscribe({
        next: (v) => {
          this.getDocuments();
        },
        error: (err) => {
          this._snackBar.open(
            '❌ Une erreur est survenue lors de la suppression du document',
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
