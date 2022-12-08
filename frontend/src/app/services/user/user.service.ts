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

  public delete(id: number): Observable<any> {
    return this.http.delete(
      `${environment.apiUrl}/${this.urlPrefix}/delete/${id}`
    );
  }

  public update(user: User): Observable<User> {
    return this.http.post<User>(
      `${environment.apiUrl}/${this.urlPrefix}/update`,
      user
    );
  }
}
