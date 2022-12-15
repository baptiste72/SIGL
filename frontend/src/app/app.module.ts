import { AppComponent } from './app.component';
import { ConnectionComponent } from './components/pages/connection/connection.component';
import { ForgotPasswordComponent } from './components/pages/forgot-password/forgot-password.component';
import { NewPasswordComponent } from './components/pages/new-password/new-password.component';
import { DashboardApprenticeComponent } from './components/pages/dashboard-apprentice/dashboard-apprentice.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NotesComponent } from './components/notes/notes.component';
import { PersonalInformationsComponent } from './components/pages/personal-informations/personal-informations.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { EvaluationsComponent } from './components/evaluations/evaluations.component';
import { EventsComponent } from './components/events/events.component';
import { DocumentsPageComponent } from './components/pages/documents-page/documents-page.component';
import { AddNotePopupComponent } from './components/pop-up/note/add-note-popup/add-note-popup.component';
import { ConfigurationComponent } from './components/pages/configuration/configuration.component';
import { AddUserPopupComponent } from './components/pop-up/user/add-user-popup/add-user-popup.component';
import { AddYearGroupPopupComponent } from './components/pop-up/year-group/add-year-group-popup/add-year-group-popup.component';
import { AddTeamPopupComponent } from './components/pop-up/tutor-team/add-team-popup/add-team-popup.component';
import { NotesPageComponent } from './components/pages/notes-page/notes-page.component';
import { UpdateYearGroupPopupComponent } from './components/pop-up/year-group/update-year-group-popup/update-year-group-popup/update-year-group-popup.component';
import { UpdateSemesterPopupComponent } from './components/pop-up/semester/update-semester-popup/update-semester-popup/update-semester-popup.component';
import { EventsPageComponent } from './components/pages/events-page/events-page.component';
import { AddCompanyFormComponent } from './components/forms/add-company-form/add-company-form.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTreeModule } from '@angular/material/tree';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { AddDeadlinePopupComponent } from './components/pop-up/deadline/add-deadline-popup/add-deadline-popup.component';
import { MatRadioModule } from '@angular/material/radio';
import {
  NgxMatDatetimePickerModule,
  NgxMatTimepickerModule,
  NgxMatNativeDateModule,
} from '@angular-material-components/datetime-picker';
import { UpdateNotePopupComponent } from './components/pop-up/note/update-note-popup/update-note-popup.component';
import { AddSemesterPopupComponent } from './components/pop-up/semester/add-semester-popup/add-semester-popup.component';
import { UpdateInterviewPopupComponent } from './components/pop-up/interview/update-interview-popup/update-interview-popup.component';
import { UpdateDeadlinePopupComponent } from './components/pop-up/deadline/update-deadline-popup/update-deadline-popup.component';
import { MatTabsModule } from '@angular/material/tabs';
import { UpdateUserPopupComponent } from './components/pop-up/user/update-user-popup/update-user-popup/update-user-popup.component';
import { ErrorInterceptor, JwtInterceptor } from './helpers';
import { ConfirmDeleteComponent } from './components/pop-up/confirm-delete/confirm-delete.component';
import { UpdateTeamPopupComponent } from './components/pop-up/tutor-team/update-team-popup/update-team-popup.component';
import { ChangePasswordComponent } from './components/pages/change-password/change-password.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr);
import { AddFormationCenterPopupComponent } from './components/pop-up/formation-center/add-formation-center-popup/add-formation-center-popup.component';
import { UpdateFormationCenterPopupComponent } from './components/pop-up/formation-center/update-formation-center-popup/update-formation-center-popup.component';
import { AddInterviewPopupComponent } from './components/pop-up/interview/add-interview-popup/add-interview-popup.component';
import { AddDocumentPopupComponent } from './components/pop-up/document/add-document-popup/add-document-popup.component';
import { MatStepperModule, MatStepper } from '@angular/material/stepper';
import { DashboardCompanyComponent } from './components/pages/dashboard-company/dashboard-company.component';

@NgModule({
  declarations: [
    AppComponent,
    ConnectionComponent,
    ForgotPasswordComponent,
    NewPasswordComponent,
    DashboardApprenticeComponent,
    NavigationComponent,
    NotesComponent,
    PersonalInformationsComponent,
    DocumentsComponent,
    EvaluationsComponent,
    EventsComponent,
    DocumentsPageComponent,
    NotesPageComponent,
    AddNotePopupComponent,
    UpdateNotePopupComponent,
    ConfigurationComponent,
    AddUserPopupComponent,
    AddYearGroupPopupComponent,
    AddTeamPopupComponent,
    AddInterviewPopupComponent,
    AddDeadlinePopupComponent,
    AddCompanyFormComponent,
    AddSemesterPopupComponent,
    UpdateYearGroupPopupComponent,
    UpdateSemesterPopupComponent,
    UpdateInterviewPopupComponent,
    UpdateDeadlinePopupComponent,
    AddDocumentPopupComponent,
    UpdateUserPopupComponent,
    ConfirmDeleteComponent,
    UpdateTeamPopupComponent,
    ChangePasswordComponent,
    PageNotFoundComponent,
    AddFormationCenterPopupComponent,
    UpdateFormationCenterPopupComponent,
    DashboardCompanyComponent,
    EventsPageComponent,
    AddInterviewPopupComponent,
  ],
  imports: [
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),

    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTreeModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatSnackBarModule,
    MatSortModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    MatTabsModule,
    MatStepperModule,
    MatRadioModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: MatDialogRef,
      useValue: {},
    },
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
