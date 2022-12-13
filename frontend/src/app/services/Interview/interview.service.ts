import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InterviewService {
  private urlPrefix = 'api/v1/interview';

  constructor(private http: HttpClient) {}

  public getInterviews(userId: number): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/${this.urlPrefix}s/${userId}`
    );
  }

  public addInterview(post: any): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/${this.urlPrefix}/add`,
      post
    );
  }

  public getInterview(id: any): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${this.urlPrefix}/${id}`);
  }

  public deleteInterview(id: any): Observable<any> {
    return this.http.delete<any>(
      `${environment.apiUrl}/${this.urlPrefix}/${id}`
    );
  }

  public updateInterview(post: any): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/${this.urlPrefix}/update`,
      post
    );
  }

  public getAll(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${this.urlPrefix}`);
  }

  public add(post: any): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/${this.urlPrefix}/add`,
      post
    );
  }
}
