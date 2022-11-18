import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class YearGroupService {
  private urlPrefix = "api/v1";

  constructor(private http: HttpClient) { }

  public getYearGroup(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${this.urlPrefix}/year-group`);
  }

  public addYearGroup(post: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/${this.urlPrefix}/add-year-group`, post);
  }

  public deleteYearGroupById(post: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/${this.urlPrefix}/delete-year-group-by-id`, post);
  }

  public updateYearGroup(post: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/${this.urlPrefix}/update-year-group`, post);
  }
}
