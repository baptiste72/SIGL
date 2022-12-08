import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InterviewService {
  private urlPrefix = 'api/v1';

  constructor(private http: HttpClient) {}

  public getInterviews(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${this.urlPrefix}/interviews`);
  }

  public addinterview(post: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/${this.urlPrefix}/add-interview`,post);
  }
}
