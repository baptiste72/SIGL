import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AddCompanyPopupComponent } from './add-company-popup.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

describe('AddCompanyPopupComponent', () => {
  let component: AddCompanyPopupComponent;
  let fixture: ComponentFixture<AddCompanyPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCompanyPopupComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientTestingModule, MatDialogModule, MatSnackBarModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddCompanyPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
