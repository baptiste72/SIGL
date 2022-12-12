import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { EventsPageComponent } from './events-page.component';
import { MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


describe('EventsPageComponent', () => {
  let component: EventsPageComponent;
  let fixture: ComponentFixture<EventsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsPageComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientTestingModule, MatDialogModule, MatSnackBarModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
