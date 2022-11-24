import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject!: BehaviorSubject<User>;
  public user!: Observable<User>;

  private urlPrefix = 'auth';

  constructor(private router: Router, private http: HttpClient) {
    const userFromLocalStorage = localStorage.getItem('user');
    if (userFromLocalStorage != null) {
      this.userSubject = new BehaviorSubject<User>(
        JSON.parse(userFromLocalStorage)
      );
      this.user = this.userSubject.asObservable();
    }
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  private httpPost(route: string, parameter: any, options?: any) {
    return this.http.post<any>(
      `${environment.apiUrl}/${this.urlPrefix}/${route}`,
      parameter,
      options
    );
  }

  public login(credentials: any): Observable<any> {
    return this.http
      .post<any>(
        `${environment.apiUrl}/${this.urlPrefix}/users/authenticate`,
        credentials,
        { withCredentials: true }
      )
      .pipe(
        map((user) => {
          // Enregistre les informations de l'utilisateur ainsi que le JWT Token dans le localStorage
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        })
      );
  }

  public logout() {
    // Suppression des données stockées dans le navigateur
    sessionStorage.removeItem('token');
    localStorage.removeItem('microsoftFlow');
    localStorage.removeItem('user');

    // FIXME: Corrgier ce truc
    // this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  public microsoftLogin(): Observable<any> {
    return this.httpGet('microsoft-login');
  }

  public microsoftGetUser(flow: any): Observable<any> {
    return this.httpPost('microsoft-get-user', flow, { withCredentials: true });
  }

  //#region Facilitateurs
  private httpGet(route: string, options?: any) {
    return this.http.get<any>(
      `${environment.apiUrl}/${this.urlPrefix}/${route}`,
      options
    );
  }

  public register(user: User): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/${this.urlPrefix}/register`,
      user,
      { withCredentials: true }
    );
  }
  //#endregion
}
