import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tutor } from '@app/models/Tutor';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TutorService {
  private urlPrefix = 'api/v1/tutors';

  constructor(private http: HttpClient) {}

  public getAll(): Observable<Tutor[]> {
    return this.http.get<Tutor[]>(`${environment.apiUrl}/${this.urlPrefix}`);
  }
}
