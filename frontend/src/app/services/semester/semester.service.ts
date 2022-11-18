import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SemesterService {
  private urlPrefix = "api/v1";

  constructor(private http: HttpClient) { }

  public getSemester(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${this.urlPrefix}/semester`);
  }

  public addSemester(post: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/${this.urlPrefix}/add-semester`, post);
  }

  public deleteSemesterById(post: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/${this.urlPrefix}/delete-semester-by-id`, post);
  }

  public updateSemester(post: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/${this.urlPrefix}/update-semester`, post);
  }
}
