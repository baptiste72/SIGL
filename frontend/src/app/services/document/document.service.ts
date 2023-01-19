import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DocumentPdf } from '@app/models/DocumentPdf';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private urlPrefix = 'api/v1/documents';

  constructor(private http: HttpClient) {}

  public getAll(): Observable<DocumentPdf[]> {
    return this.http.get<DocumentPdf[]>(`${environment.apiUrl}/${this.urlPrefix}`);
  }

  public getById(id: number) {
    return this.http.get<any>(`${environment.apiUrl}/${this.urlPrefix}/${id}`, {
      responseType: 'blob' as 'json',
    });
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
}
