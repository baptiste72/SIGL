import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '@app/services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.authService.userValue;

    if (user) {
      // Vérifie si la route est restreinte par un rôle
      if (
        route.data['roles'] &&
        route.data['roles'].indexOf(user.role) === -1
      ) {
        // le rôle n'est pas autorisé
        this._snackBar.open("🔒 Vous n'avez pas accès à cette zone.", 'Ok', {
          duration: 2000,
        });
        return false;
      }

      // rôle autorisé
      return true;
    }

    // pas connecté, donc redirection vers la page de connexion avec l'url de retour.
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
