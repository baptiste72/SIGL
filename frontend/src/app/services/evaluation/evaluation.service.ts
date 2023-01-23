import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Evaluation } from '@app/models/Evaluation';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EvaluationService {
  private urlPrefix = 'api/v1/evaluations';
  private urlOwner = 'owner';

  constructor(private http: HttpClient) {}

  public getAll(): Observable<Evaluation[]> {
    return this.http.get<Evaluation[]>(
      `${environment.apiUrl}/${this.urlPrefix}`
    );
  }

  public getById(id: number) {
    return this.http.get<any>(`${environment.apiUrl}/${this.urlPrefix}/${id}`, {
      responseType: 'blob' as 'json',
    });
  }

  public getByOwner(id: number): Observable<Evaluation[]> {
    return this.http.get<Evaluation[]>(`${environment.apiUrl}/${this.urlPrefix}/${this.urlOwner}/${id}`
    );
  }

  public add(formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(
      `${environment.apiUrl}/${this.urlPrefix}`,
      formData
    );
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${this.urlPrefix}/${id}`);
  }

  public cleanup(file_name: string): Observable<any> {
    return this.http.delete(
      `${environment.apiUrl}/${this.urlPrefix}/cleanup/${file_name}`
    );
  }

  public update(formData: FormData, id: number): Observable<FormData> {
    return this.http.put<FormData>(
      `${environment.apiUrl}/${this.urlPrefix}/${id}`,
      formData
    );
  }
}
