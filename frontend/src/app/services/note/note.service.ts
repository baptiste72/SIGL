import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class NoteService {
private urlPrefix = "api/v1";

constructor(private http: HttpClient) { }

public getnote(id:any): Observable<any> {
  return this.http.get<any>(`${environment.apiUrl}/${this.urlPrefix}/note/${id}`);
}

public deletenote(id:any): Observable<any> {
  return this.http.delete<any>(`${environment.apiUrl}/${this.urlPrefix}/note/${id}`);
}

public updatenote(post:any): Observable<any> {
  return this.http.post<any>(`${environment.apiUrl}/${this.urlPrefix}/update-note`,post);
}

public getnotes(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${this.urlPrefix}/notes`);
}

public treenotes(): Observable<any> {
  return this.http.get<any>(`${environment.apiUrl}/${this.urlPrefix}/treeNote`);
}

public addnote(post: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/${this.urlPrefix}/add-note`, post);
}

}
