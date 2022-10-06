import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, Observable, pipe, throwError } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private url = "add-user";
  private posturl="http://127.0.0.1:8000/api/v1/add-user"
  constructor(private http: HttpClient) { }

  public registerUser(userData: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/${this.url}`, userData);
  }

  public saveUser(userData: any) {
    return this.http.post(this.posturl, userData)
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

}
