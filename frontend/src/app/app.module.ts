import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { AddNotePopupComponent } from './components/pop-up/add-note-popup/add-note-popup.component';
import { ConfigurationComponent } from './components/pages/configuration/configuration.component';
import { AddUserPopupComponent } from './components/pop-up/add-user-popup/add-user-popup.component';
import { AddPromotionPopupComponent } from './components/pop-up/add-promotion-popup/add-promotion-popup.component';
import { AddTeamPopupComponent } from './components/pop-up/add-team-popup/add-team-popup.component';
import { NotesPageComponent } from './components/pages/notes-page/notes-page.component';

import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTreeModule } from '@angular/material/tree';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { EventsPageComponent } from './components/pages/events-page/events-page.component';
import { AddEventPopupComponent } from './components/pop-up/add-event-popup/add-event-popup.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';


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
    ConfigurationComponent,
    AddUserPopupComponent,
    AddPromotionPopupComponent,
    AddTeamPopupComponent,
    EventsPageComponent,
    AddEventPopupComponent
  ],
  imports: [
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
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [

  ]
})
export class AppModule { }
