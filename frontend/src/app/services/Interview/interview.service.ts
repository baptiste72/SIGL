import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InterviewService {
  private urlPrefix = 'api/v1';

  constructor(private http: HttpClient) {}

  public getInterviews(): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/${this.urlPrefix}/interviews`
    );
  }

  public addInterview(post: any): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/${this.urlPrefix}/add-interview`,
      post
    );
  }

  public getInterview(id: any): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/${this.urlPrefix}/deadline/${id}`
    );
  }

  public deleteInterview(id: any): Observable<any> {
    return this.http.delete<any>(
      `${environment.apiUrl}/${this.urlPrefix}/deadline/${id}`
    );
  }

  public updateInterview(post: any): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/${this.urlPrefix}/update-deadline`,
      post
    );
  }
}
