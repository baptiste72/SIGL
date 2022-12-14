import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Opco } from '@app/models/Opco';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OpcoService {
  private urlPrefix = 'api/v1/opco';

  constructor(private http: HttpClient) {}

  public getAll(): Observable<Opco> {
    return this.http.get<Opco>(`${environment.apiUrl}/${this.urlPrefix}`);
  }

  public add(opco: Opco): Observable<Opco> {
    return this.http.post<Opco>(
      `${environment.apiUrl}/${this.urlPrefix}`,
      opco
    );
  }

  public getById(id: number): Observable<Opco> {
    return this.http.get<Opco>(
      `${environment.apiUrl}/${this.urlPrefix}/${id}`
    );
  }
}
