import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TutorTeam } from 'src/app/models/TutorTeam';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TutorTeamService {
  private urlPrefix = 'api/v1/tutor-teams';

  constructor(private http: HttpClient) {}

  public getAll(): Observable<TutorTeam[]> {
    return this.http.get<TutorTeam[]>(
      `${environment.apiUrl}/${this.urlPrefix}`
    );
  }

  public get(id: number): Observable<TutorTeam> {
    return this.http.get<TutorTeam>(
      `${environment.apiUrl}/${this.urlPrefix}/${id}`
    );
  }

  public add(tutorTeam: TutorTeam): Observable<TutorTeam> {
    return this.http.post<TutorTeam>(
      `${environment.apiUrl}/${this.urlPrefix}`,
      tutorTeam
    );
  }

  public update(tutorTeam: TutorTeam, id: number): Observable<TutorTeam> {
    return this.http.put<TutorTeam>(
      `${environment.apiUrl}/${this.urlPrefix}/${id}`,
      tutorTeam
    );
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${this.urlPrefix}/${id}`);
  }
}
