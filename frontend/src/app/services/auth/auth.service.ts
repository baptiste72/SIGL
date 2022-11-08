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

  public register(user: User): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/${this.urlPrefix}/register`, user, { withCredentials: true });
  }

  public login(credentials: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/${this.urlPrefix}/login`, credentials, { withCredentials: true });
  }

  public logout(): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/${this.urlPrefix}/logout`, '', { withCredentials: true });
  }

  public getUser(): Observable<any> {
    return this.http.get<User>(`${environment.apiUrl}/${this.urlPrefix}/user`, { withCredentials: true });
  }

}
