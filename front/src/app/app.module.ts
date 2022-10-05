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

import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { NotesPageComponent } from './components/pages/notes-page/notes-page.component';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTreeModule } from '@angular/material/tree';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

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
    AddNotePopupComponent
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
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [

  ]
})
export class AppModule { }
