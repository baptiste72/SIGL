import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from '@app/models/Company';
import { CompanyUserCompanyInfoAssociation } from '@app/models/CompanyUserCompanyInfoAssociation';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private urlPrefix = 'api/v1/companies';

  constructor(private http: HttpClient) {}

  public getAll(): Observable<Company> {
    return this.http.get<Company>(`${environment.apiUrl}/${this.urlPrefix}`);
  }

  public add(company: Company): Observable<Company> {
    return this.http.post<Company>(
      `${environment.apiUrl}/${this.urlPrefix}/add`,
      company
    );
  }

  public getById(id: number) {
    return this.http.get<CompanyUserCompanyInfoAssociation>(
      `${environment.apiUrl}/${this.urlPrefix}/${id}`
    );
  }
}
