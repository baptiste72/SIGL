import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Deadline } from '@app/models/Deadline';

@Injectable({
  providedIn: 'root',
})
export class DeadlineService {
  private urlPrefix = 'api/v1/deadlines';
  constructor(private http: HttpClient) {}

  public getAll(): Observable<Deadline[]> {
    return this.http.get<Deadline[]>(`${environment.apiUrl}/${this.urlPrefix}`);
  }

  public get(id: number): Observable<Deadline> {
    return this.http.get<Deadline>(
      `${environment.apiUrl}/${this.urlPrefix}/${id}`
    );
  }

  public getAllByUserId(userId: number): Observable<Deadline[]> {
    return this.http.get<Deadline[]>(
      `${environment.apiUrl}/${this.urlPrefix}/users/${userId}`
    );
  }

  public add(deadline: Deadline): Observable<Deadline> {
    return this.http.post<Deadline>(
      `${environment.apiUrl}/${this.urlPrefix}`,
      deadline
    );
  }

  public update(deadline: Deadline, id: number): Observable<Deadline> {
    return this.http.put<Deadline>(
      `${environment.apiUrl}/${this.urlPrefix}/${id}/`,
      deadline
    );
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${this.urlPrefix}/${id}`);
  }
}
