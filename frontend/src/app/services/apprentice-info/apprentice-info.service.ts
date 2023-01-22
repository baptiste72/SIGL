import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApprenticeInfo } from '@app/models/ApprenticeInfo';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApprenticeInfoService {
  private urlPrefix = 'api/v1/apprentice-infos';

  constructor(private http: HttpClient) {}

  public getAll(): Observable<ApprenticeInfo[]> {
    return this.http.get<ApprenticeInfo[]>(
      `${environment.apiUrl}/${this.urlPrefix}`
    );
  }

  public add(apprenticeInfo: ApprenticeInfo) {
    return this.http.post<ApprenticeInfo>(
      `${environment.apiUrl}/${this.urlPrefix}`,
      apprenticeInfo,
      { withCredentials: true }
    );
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${this.urlPrefix}/${id}`);
  }

  public update(apprenticeInfo: ApprenticeInfo): Observable<ApprenticeInfo> {
    return this.http.put<ApprenticeInfo>(
      `${environment.apiUrl}/${this.urlPrefix}/${apprenticeInfo.id}`,
      apprenticeInfo
    );
  }

  public validateMission(
    apprenticeInfo: ApprenticeInfo,
    comment: string
  ): Observable<ApprenticeInfo> {
    return this.http.put<ApprenticeInfo>(
      `${environment.apiUrl}/${this.urlPrefix}/validate/${apprenticeInfo.id}`,
      { apprenticeInfo: apprenticeInfo, comment: comment }
    );
  }
}
