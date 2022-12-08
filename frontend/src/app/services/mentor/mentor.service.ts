import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MentorService {
  private urlPrefix = "api/v1";

  constructor(private http: HttpClient) { }

  public getMentor(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${this.urlPrefix}/mentors`);
  }
}
