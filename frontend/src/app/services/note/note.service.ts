import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private urlPrefix = 'api/v1';

  constructor(private http: HttpClient) {}

  public getNote(id: any): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/${this.urlPrefix}/note/${id}`
    );
  }

  public deleteNote(id: any): Observable<any> {
    return this.http.delete<any>(
      `${environment.apiUrl}/${this.urlPrefix}/note/${id}`
    );
  }

  public getNotesbyUserId(userId: number): Observable<any> {
    const url = `${environment.apiUrl}/${this.urlPrefix}/note-by-user-id/${userId}`;
    return this.http.get<any>(url);
  }

  public updateNote(post: any): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/${this.urlPrefix}/update-note`,
      post
    );
  }

  public getNotes(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${this.urlPrefix}/notes`);
  }

  public treeNotes(userId: number): Observable<any> {
    const url = `${environment.apiUrl}/${this.urlPrefix}/tree-note/${userId}`;
    return this.http.get<any>(url);
  }

  public addNote(post: any): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/${this.urlPrefix}/add-note`,
      post
    );
  }
}
