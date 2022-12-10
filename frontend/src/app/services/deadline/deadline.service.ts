import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DeadlineService {
  private urlPrefix = 'api/v1';
  constructor(private http: HttpClient) {}

  public getDeadlines(): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/${this.urlPrefix}/deadlines`
    );
  }

  public addDeadline(post: any): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/${this.urlPrefix}/add-deadline`,
      post
    );
  }

  public getDeadline(id: any): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/${this.urlPrefix}/deadline/${id}`
    );
  }

  public deleteDeadline(id: any): Observable<any> {
    return this.http.delete<any>(
      `${environment.apiUrl}/${this.urlPrefix}/deadline/${id}`
    );
  }

  public updateDeadline(post: any): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/${this.urlPrefix}/update-deadline`,
      post
    );
  }

  public getAll(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${this.urlPrefix}`);
  }

  public add(deadline: any): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/${this.urlPrefix}/add`,
      deadline
    );
  }
}
