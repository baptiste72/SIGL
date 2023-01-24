import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Period } from '@app/models/period';

@Injectable({
  providedIn: 'root',
})
export class PeriodService {
  private urlPrefix = 'api/v1/periods';
  constructor(private http: HttpClient) {}

  public getAll(): Observable<Period[]> {
    return this.http.get<Period[]>(`${environment.apiUrl}/${this.urlPrefix}`);
  }

  public get(id: number): Observable<Period> {
    return this.http.get<Period>(
      `${environment.apiUrl}/${this.urlPrefix}/${id}`
    );
  }

  public getAllByUserId(userId: number): Observable<Period[]> {
    return this.http.get<Period[]>(
      `${environment.apiUrl}/${this.urlPrefix}/users/${userId}`
    );
  }

  public add(period: Period): Observable<Period> {
    return this.http.post<Period>(
      `${environment.apiUrl}/${this.urlPrefix}`,
      period
    );
  }

  public update(period: Period, id: number): Observable<Period> {
    return this.http.put<Period>(
      `${environment.apiUrl}/${this.urlPrefix}/${id}/`,
      period
    );
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${this.urlPrefix}/${id}`);
  }
}
