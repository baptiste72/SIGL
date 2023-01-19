import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactCompany } from '@app/models/ContactCompany';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactCompanyService {
  private urlPrefix = 'api/v1/contact-company';

  constructor(private http: HttpClient) {}

  public getAll(): Observable<ContactCompany> {
    return this.http.get<any>(`${environment.apiUrl}/${this.urlPrefix}`);
  }

  public add(contact: ContactCompany): Observable<ContactCompany> {
    return this.http.post<ContactCompany>(
      `${environment.apiUrl}/${this.urlPrefix}`,
      contact
    );
  }

  public getById(id: number): Observable<ContactCompany> {
    return this.http.get<ContactCompany>(
      `${environment.apiUrl}/${this.urlPrefix}/${id}`
    );
  }
}
