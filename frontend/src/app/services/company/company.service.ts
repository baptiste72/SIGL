import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from '@app/models/Company';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private urlPrefix = 'api/v1/companies';

  constructor(private http: HttpClient) {}

  public getAll(): Observable<Company[]> {
    return this.http.get<Company[]>(`${environment.apiUrl}/${this.urlPrefix}`);
  }

  public add(company: Company): Observable<Company> {
    return this.http.post<Company>(
      `${environment.apiUrl}/${this.urlPrefix}`,
      company
    );
  }

  public update(company: Company): Observable<Company> {
    return this.http.put<Company>(
      `${environment.apiUrl}/${this.urlPrefix}/${company.cmp_siret}`,
      company
    );
  }

  public getById(id: string): Observable<Company> {
    return this.http.get<Company>(
      `${environment.apiUrl}/${this.urlPrefix}/${id}`
    );
  }
}
