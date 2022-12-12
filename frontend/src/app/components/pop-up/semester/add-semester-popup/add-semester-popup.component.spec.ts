import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AddSemesterPopupComponent } from './add-semester-popup.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatDialogModule, MatDialogRef,  } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

describe('AddSemesterPopupComponent', () => {
  let component: AddSemesterPopupComponent;
  let fixture: ComponentFixture<AddSemesterPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSemesterPopupComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientTestingModule, MatDialogModule, MatSnackBarModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSemesterPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
