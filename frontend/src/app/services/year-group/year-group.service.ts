import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class YearGroupService {
  private urlPrefix = 'api/v1/year-group';

  constructor(private http: HttpClient) {}

  public getAll(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${this.urlPrefix}`);
  }

  public add(post: any): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/${this.urlPrefix}/add`,
      post
    );
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(
      `${environment.apiUrl}/${this.urlPrefix}/delete/${id}`
    );
  }

  public update(post: any): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/${this.urlPrefix}/update`,
      post
    );
  }
}
