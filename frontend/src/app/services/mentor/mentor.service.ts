import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mentor } from '@app/models/Mentor';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MentorService {
  private urlPrefix = 'api/v1/mentors';

  constructor(private http: HttpClient) {}

  public getAll(): Observable<Mentor[]> {
    return this.http.get<Mentor[]>(`${environment.apiUrl}/${this.urlPrefix}`);
  }

  public getAllByCompany(siret: string): Observable<Mentor[]> {
    return this.http.get<Mentor[]>(
      `${environment.apiUrl}/${this.urlPrefix}/company/${siret}`
    );
  }

  public add(mentor: Mentor): Observable<Mentor> {
    return this.http.post<Mentor>(
      `${environment.apiUrl}/${this.urlPrefix}`,
      mentor
    );
  }

  public update(mentor: Mentor): Observable<Mentor> {
    return this.http.put<Mentor>(
      `${environment.apiUrl}/${this.urlPrefix}/${mentor.id}`,
      mentor
    );
  }
}
