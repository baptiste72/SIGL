import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormationCenterService {
  private urlPrefix = "api/v1";
  constructor(private http: HttpClient) { }

  public getFormationCenter(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${this.urlPrefix}/formationCenter`);
}
}
