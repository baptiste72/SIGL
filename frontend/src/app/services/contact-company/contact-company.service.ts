import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactCompany } from '@app/models/contactCompany';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactCompanyService {
  private urlPrefix = 'api/v1/contact-company';

  constructor(private http: HttpClient) {}

  public getAll(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${this.urlPrefix}`);
  }

  public add(contact: ContactCompany): Observable<ContactCompany> {
    return this.http.post<ContactCompany>(
      `${environment.apiUrl}/${this.urlPrefix}/add`,
      contact
    );
  }
}
