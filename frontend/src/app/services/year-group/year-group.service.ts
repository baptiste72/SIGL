import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { YearGroup } from '@app/models/YearGroup';

@Injectable({
  providedIn: 'root',
})
export class YearGroupService {
  private urlPrefix = 'api/v1/year-group';

  constructor(private http: HttpClient) {}

  public getAll(): Observable<YearGroup[]> {
    return this.http.get<YearGroup[]>(
      `${environment.apiUrl}/${this.urlPrefix}`
    );
  }

  public get(id: number): Observable<YearGroup> {
    return this.http.get<YearGroup>(
      `${environment.apiUrl}/${this.urlPrefix}/${id}`
    );
  }

  public add(yearGroup: YearGroup): Observable<YearGroup> {
    return this.http.post<YearGroup>(
      `${environment.apiUrl}/${this.urlPrefix}`,
      yearGroup
    );
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${this.urlPrefix}/${id}`);
  }

  public update(yearGroup: YearGroup, id: number): Observable<YearGroup> {
    return this.http.put<YearGroup>(
      `${environment.apiUrl}/${this.urlPrefix}/${id}`,
      yearGroup
    );
  }
}
