import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '@app/helpers';
import { BehaviorSubject, map } from 'rxjs';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  private urlPrefix = 'auth';

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('user') ?? '{}')
    );

    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  public login(credentials: any): Observable<any> {
    return this.http
      .post<any>(`${environment.apiUrl}/${this.urlPrefix}/login`, credentials, {
        withCredentials: true,
      })
      .pipe(
        map((user) => {
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        })
      );
  }

  public logout() {
    // Suppression des données stockées dans le navigateur
    return this.http
      .get<any>(`${environment.apiUrl}/${this.urlPrefix}/logout`)
      .subscribe(() => {
        this.router.navigate(['/login']);
        localStorage.removeItem('microsoftFlow');
        localStorage.removeItem('user');
        this.userSubject.next(null as any);
      });
  }

  public microsoftLogin(): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/${this.urlPrefix}/microsoft/login`
    );
  }

  public microsoftGetUser(flow: any): Observable<any> {
    return this.http
      .post<any>(
        `${environment.apiUrl}/${this.urlPrefix}/microsoft/user`,
        flow,
        { withCredentials: true }
      )
      .pipe(
        map((user) => {
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        })
      );
  }
}
