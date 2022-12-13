import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormationCenter } from '@app/models/FormationCenter';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FormationCenterService {
  private urlPrefix = 'api/v1/formation-centers';

  constructor(private http: HttpClient) {}

  public getAll(): Observable<FormationCenter[]> {
    return this.http.get<FormationCenter[]>(
      `${environment.apiUrl}/${this.urlPrefix}`
    );
  }

  public add(formationCenter: FormationCenter) {
    return this.http.post<FormationCenter>(
      `${environment.apiUrl}/${this.urlPrefix}`,
      formationCenter,
      { withCredentials: true }
    );
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${this.urlPrefix}/${id}`);
  }

  public update(formationCenter: FormationCenter): Observable<FormationCenter> {
    return this.http.put<FormationCenter>(
      `${environment.apiUrl}/${this.urlPrefix}/${formationCenter.id}`,
      formationCenter
    );
  }
}
