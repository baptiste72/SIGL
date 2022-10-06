import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationComponent } from './components/pages/configuration/configuration.component';
import { ConnectionComponent } from './components/pages/connection/connection.component';
import { DashboardApprenticeComponent } from './components/pages/dashboard-apprentice/dashboard-apprentice.component';
import { DocumentsPageComponent } from './components/pages/documents-page/documents-page.component';
import { ForgotPasswordComponent } from './components/pages/forgot-password/forgot-password.component';
import { NewPasswordComponent } from './components/pages/new-password/new-password.component';
import { NotesPageComponent } from './components/pages/notes-page/notes-page.component';
import { PersonalInformationsComponent } from './components/pages/personal-informations/personal-informations.component';

const routes: Routes = [
  { path: '', component: ConnectionComponent },
  { path: 'login', component: ConnectionComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'new-password', component: NewPasswordComponent },
  { path: 'dashboard-apprentice', component: DashboardApprenticeComponent },
  { path: 'profil', component: PersonalInformationsComponent },
  { path: 'documents', component: DocumentsPageComponent },
  { path: 'notes', component: NotesPageComponent },
  { path: 'configuration', component: ConfigurationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
