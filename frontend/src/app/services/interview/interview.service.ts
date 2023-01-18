import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Attendee } from '@app/models/Attendee';
import { Interview } from '@app/models/Interview';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InterviewService {
  private urlPrefix = 'api/v1/interviews';

  constructor(private http: HttpClient) {}

  public getAll(): Observable<Interview[]> {
    return this.http.get<Interview[]>(
      `${environment.apiUrl}/${this.urlPrefix}`
    );
  }

  public get(id: number): Observable<Interview> {
    return this.http.get<Interview>(
      `${environment.apiUrl}/${this.urlPrefix}/${id}`
    );
  }

  public getAllByUserId(userId: number): Observable<Interview[]> {
    return this.http.get<Interview[]>(
      `${environment.apiUrl}/${this.urlPrefix}/users/${userId}`
    );
  }

  public getAttendees(listId: number[]): Observable<Attendee[]> {
    return this.http.post<Attendee[]>(
      `${environment.apiUrl}/${this.urlPrefix}/attendees`,
      listId
    );
  }

  public add(interview: Interview): Observable<Interview> {
    return this.http.post<Interview>(
      `${environment.apiUrl}/${this.urlPrefix}`,
      interview
    );
  }

  public update(interview: Interview, id: number): Observable<Interview> {
    return this.http.put<Interview>(
      `${environment.apiUrl}/${this.urlPrefix}/${id}`,
      interview
    );
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${this.urlPrefix}/${id}`);
  }
}
