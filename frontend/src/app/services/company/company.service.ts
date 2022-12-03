import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private urlPrefix = "api/v1";
  constructor(private http: HttpClient) { }

  public getCompany(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${this.urlPrefix}/companys`);
}
}