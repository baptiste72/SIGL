import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { User } from '@app/models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private urlPrefix = 'api/v1/users';
  constructor(private http: HttpClient) {}

  public getAll(): Observable<any> {
    return this.http.get<User[]>(`${environment.apiUrl}/${this.urlPrefix}`);
  }

  public getById(id: number) {
    return this.http.get<User>(`${environment.apiUrl}/${this.urlPrefix}/${id}`);
  }

  public add(user: User) {
    return this.http.post<User>(
      `${environment.apiUrl}/${this.urlPrefix}`,
      user,
      { withCredentials: true }
    );
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${this.urlPrefix}/${id}`);
  }

  public update(user: User): Observable<User> {
    return this.http.put<User>(
      `${environment.apiUrl}/${this.urlPrefix}/${user.id}`,
      user
    );
  }

  public resetPassword(email: string): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/${this.urlPrefix}/password-reset/`,
      { email: email }
    );
  }

  public setNewPassword(data): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/${this.urlPrefix}/password-reset/confirm/`,
      data
    );
  }

  public changePassword(data: any): Observable<any> {
    return this.http.put<any>(
      `${environment.apiUrl}/${this.urlPrefix}/change-password`,
      data
    );
  }
}
