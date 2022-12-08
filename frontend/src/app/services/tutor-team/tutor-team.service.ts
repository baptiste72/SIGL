import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TutorTeam } from 'src/app/models/TutorTeam';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TutorTeamService {
  private urlPrefix = "api/v1";

  constructor(private http: HttpClient) {}

  public getTutorsTeam(): Observable<TutorTeam[]> {
    return this.http.get<TutorTeam[]>(`${environment.apiUrl}/${this.urlPrefix}/tutor-teams`);
  }

  public addTutorTeams(post: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/${this.urlPrefix}/add-tutor-teams`, post);
  }
}
