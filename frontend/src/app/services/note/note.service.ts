import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Note } from '@app/models/Note';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private urlPrefix = 'api/v1/notes';

  constructor(private http: HttpClient) {}

  public get(id: any): Observable<Note> {
    return this.http.get<Note>(`${environment.apiUrl}/${this.urlPrefix}/${id}`);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${this.urlPrefix}/${id}`);
  }

  public getAllByUserId(userId: number): Observable<Note[]> {
    return this.http.get<Note[]>(
      `${environment.apiUrl}/${this.urlPrefix}/users/${userId}/`
    );
  }

  public update(note: Note, id: number): Observable<Note> {
    return this.http.put<Note>(
      `${environment.apiUrl}/${this.urlPrefix}/${id}`,
      note
    );
  }

  public getAll(): Observable<Note[]> {
    return this.http.get<Note[]>(`${environment.apiUrl}/${this.urlPrefix}`);
  }

  public treeNotes(userId: number): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/${this.urlPrefix}/tree-note/${userId}/`
    );
  }

  public add(note: Note): Observable<Note> {
    return this.http.post<Note>(
      `${environment.apiUrl}/${this.urlPrefix}`,
      note
    );
  }
}
