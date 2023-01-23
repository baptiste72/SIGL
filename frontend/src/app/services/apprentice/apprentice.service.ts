import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apprentice } from '@app/models/Apprentice';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApprenticeService {
  private urlPrefix = 'api/v1/apprentices';

  constructor(private http: HttpClient) {}

  public getAll(): Observable<Apprentice[]> {
    return this.http.get<Apprentice[]>(
      `${environment.apiUrl}/${this.urlPrefix}`
    );
  }

  public getById(id: number): Observable<Apprentice> {
    return this.http.get<Apprentice>(
      `${environment.apiUrl}/${this.urlPrefix}/${id}`
    );
  }

  public add(apprentice: Apprentice) {
    return this.http.post<Apprentice>(
      `${environment.apiUrl}/${this.urlPrefix}`,
      apprentice
    );
  }
}
