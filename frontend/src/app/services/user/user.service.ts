import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlPrefix = "api/v1";
  constructor(private http: HttpClient) { }

  public getUser(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${this.urlPrefix}/users`);
  }

  public deleteUserById(post: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/${this.urlPrefix}/delete-user`, post);
  }
}
