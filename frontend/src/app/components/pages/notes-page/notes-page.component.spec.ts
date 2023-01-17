import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NotesPageComponent } from './notes-page.component';
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

describe('NotesPageComponent', () => {
  let component: NotesPageComponent;
  let fixture: ComponentFixture<NotesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotesPageComponent],
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

    fixture = TestBed.createComponent(NotesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
