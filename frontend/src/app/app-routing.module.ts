import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './components/pages/change-password/change-password.component';
import { ConfigurationComponent } from './components/pages/configuration/configuration.component';
import { ConnectionComponent } from './components/pages/connection/connection.component';
import { DashboardApprenticeComponent } from './components/pages/dashboard-apprentice/dashboard-apprentice.component';
import { DocumentsPageComponent } from './components/pages/documents-page/documents-page.component';
import { EventsPageComponent } from './components/pages/events-page/events-page.component';
import { ForgotPasswordComponent } from './components/pages/forgot-password/forgot-password.component';
import { NewPasswordComponent } from './components/pages/new-password/new-password.component';
import { NotesPageComponent } from './components/pages/notes-page/notes-page.component';
import { PersonalInformationsComponent } from './components/pages/personal-informations/personal-informations.component';
import { AuthGuard, Role } from './helpers';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import { DashboardCompanyComponent } from './components/pages/dashboard-company/dashboard-company.component';

const routes: Routes = [
  { path: '', component: ConnectionComponent },
  { path: 'login', component: ConnectionComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'new-password', component: NewPasswordComponent },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    component: DashboardApprenticeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard-company',
    component: DashboardCompanyComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.COMPANY] },
  },
  {
    path: 'profile',
    component: PersonalInformationsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'documents',
    component: DocumentsPageComponent,
    canActivate: [AuthGuard],
  },
  { path: 'notes', component: NotesPageComponent, canActivate: [AuthGuard] },
  {
    path: 'configuration',
    component: ConfigurationComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.ADMIN, Role.COORDINATOR] },
  },
  { path: 'events', component: EventsPageComponent, canActivate: [AuthGuard] },
  // Redirection vers la page d'erreur 404 - cette route doit être la dernière du tableau
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
