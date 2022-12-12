import { Injectable } from '@angular/core';
import { CompanyUserCompanyInfoAssociation } from '@app/models/CompanyUserCompanyInfoAssociation';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CompanyUserCompanyInfoService {
  private urlPrefix = 'api/v1/company-user';

  constructor(private http: HttpClient) {}

  public getById(id: number) {
    return this.http.get<CompanyUserCompanyInfoAssociation>(
      `${environment.apiUrl}/${this.urlPrefix}/${id}`
    );
  }

  public add(
    company: CompanyUserCompanyInfoAssociation
  ): Observable<CompanyUserCompanyInfoAssociation> {
    return this.http.post<CompanyUserCompanyInfoAssociation>(
      `${environment.apiUrl}/${this.urlPrefix}/add`,
      company
    );
  }

  public update(
    user: CompanyUserCompanyInfoAssociation
  ): Observable<CompanyUserCompanyInfoAssociation> {
    return this.http.put<CompanyUserCompanyInfoAssociation>(
      `${environment.apiUrl}/${this.urlPrefix}/${user.user_company_id}`,
      user
    );
  }
}
