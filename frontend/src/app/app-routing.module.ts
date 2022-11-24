import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

const routes: Routes = [
  { path: '', component: ConnectionComponent },
  { path: 'login', component: ConnectionComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'new-password', component: NewPasswordComponent },
  {
    path: 'dashboard',
    component: DashboardApprenticeComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.APPRENTICE] },
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
    // FIXME: Retiré provisoirement pour pouvoir créer un compte en période de dév
    // canActivate: [AuthGuard],
    // data: { roles: [Role.CA] },
  },
  { path: 'events', component: EventsPageComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
