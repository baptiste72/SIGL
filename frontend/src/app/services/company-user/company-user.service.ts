import { Injectable } from '@angular/core';
import { CompanyUser } from '@app/models/CompanyUser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CompanyUserService {
  private urlPrefix = 'api/v1/company-user';

  constructor(private http: HttpClient) {}

  public getById(id: number): Observable<CompanyUser> {
    return this.http.get<CompanyUser>(
      `${environment.apiUrl}/${this.urlPrefix}/${id}`
    );
  }

  public add(
    user: CompanyUser
  ): Observable<CompanyUser> {
    return this.http.post<CompanyUser>(
      `${environment.apiUrl}/${this.urlPrefix}`,
      user
    );
  }

  public update(
    user: CompanyUser
  ): Observable<CompanyUser> {
    return this.http.put<CompanyUser>(
      `${environment.apiUrl}/${this.urlPrefix}/${user.id}`,
      user
    );
  }
}
