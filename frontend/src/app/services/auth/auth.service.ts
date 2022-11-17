import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlPrefix = "auth";

  constructor(private http: HttpClient) { }

  private httpPost(route: string, parameter: any, options?: any) {
    return this.http.post<any>(`${environment.apiUrl}/${this.urlPrefix}/${route}`, parameter, options);
  }

  private httpGet(route: string, options?: any) {
    return this.http.get<any>(`${environment.apiUrl}/${this.urlPrefix}/${route}`, options);
  }

  public register(user: User): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/${this.urlPrefix}/register`, user, { withCredentials: true });
  }

  public login(credentials: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/${this.urlPrefix}/login`, credentials, { withCredentials: true });
  }

  public logout(): Observable<any> {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('microsoftFlow');

    return this.http.post<any>(`${environment.apiUrl}/${this.urlPrefix}/logout`, '', { withCredentials: true });
  }

  public getUser(): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/${this.urlPrefix}/user`, { withCredentials: true });
  }

  public microsoftLogin(): Observable<any> {
    return this.httpGet('microsoft-login')
  }

  public microsoftGetUser(flow: any): Observable<any> {
    return this.httpPost('microsoft-get-user', flow, { withCredentials: true });
  }
}
