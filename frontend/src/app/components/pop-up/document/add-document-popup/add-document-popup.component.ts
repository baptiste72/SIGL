import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '@app/models/User';
import { AuthService } from '@app/services/auth/auth.service';
import { YearGroup } from 'src/app/models/YearGroup';
import { DocumentService } from 'src/app/services/document/document.service';
import { YearGroupService } from 'src/app/services/year-group/year-group.service';

@Component({
  selector: 'app-add-document-popup',
  templateUrl: './add-document-popup.component.html',
  styleUrls: ['./add-document-popup.component.scss'],
})
export class AddDocumentPopupComponent implements OnInit {
  register: any;
  yearGroups: YearGroup[] = [];
  public user: User;
  selectedFile: any = null;
  formData = new FormData();
  file_name: any;
  public addDocumentForm: FormGroup;
  submitted: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddDocumentPopupComponent>,
    private yearGroupService: YearGroupService,
    private documentService: DocumentService,
    private _snackBar: MatSnackBar,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.user = this.authService.userValue;
    this.addDocumentForm = this.formBuilder.group({
      name: ['', Validators.required],
      yearGroup: ['', Validators.required],
      pdf: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getYearGroup();
    this.register = {
      name: '',
      link: './link',
      yearGroup: '',
    };
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close' });
  }

  private getYearGroup() {
    this.yearGroupService.getAll().subscribe({
      next: (yearGroupsData) => {
        this.yearGroups = yearGroupsData;
      },
      error: (err) => {
        this._snackBar.open(
          '❌ Une erreur est survenue lors de la récupération des promotions',
          'Ok',
          {
            duration: 2000,
          }
        );
      },
    });
  }

  addDocument(data: any) {
    this.submitted = true;
    if (this.addDocumentForm.valid) {
      this.formData.append('file', this.selectedFile);
      this.formData.append('name', this.register.name);
      this.formData.append('file_name', this.file_name);
      this.formData.append('link', this.register.link);
      this.formData.append('yearGroup', this.register.yearGroup);
      // this.formData.append('user', this.user.id.toString());
      this.formData.append('user', '1');
      this.documentService.add(this.formData).subscribe({
        next: (v) => {
          this._snackBar.open('✔ Document ajouté', 'Ok', { duration: 2000 });
          this.closeDialog();
        },
        error: (err) => {
          this._snackBar.open(
            '❌ Une erreur est survenue lors de l ajout du document',
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
