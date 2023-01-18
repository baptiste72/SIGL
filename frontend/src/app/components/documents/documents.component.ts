import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DocumentPdf } from '@app/models/DocumentPdf';
import { DocumentService } from '@app/services/document/document.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
})
export class DocumentsComponent implements OnInit {
  public documents: DocumentPdf[] = [];

  constructor(
    private documentService: DocumentService,
    private _snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.getDocuments();
  }


  private getDocuments() {
    this.documentService.getAll().subscribe({
      next: (documents) => {
        this.documents = documents;
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
