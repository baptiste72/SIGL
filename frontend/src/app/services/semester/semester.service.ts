import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Semester } from '@app/models/Semester';

@Injectable({
  providedIn: 'root',
})
export class SemesterService {
  private urlPrefix = 'api/v1/semesters';

  constructor(private http: HttpClient) {}

  public getAll(): Observable<Semester[]> {
    return this.http.get<Semester[]>(`${environment.apiUrl}/${this.urlPrefix}`);
  }

  public getAllByYearGroup(yearGroupId: number): Observable<Semester[]> {
    return this.http.get<Semester[]>(
      `${environment.apiUrl}/${this.urlPrefix}/year-groups/${yearGroupId}`
    );
  }

  public get(id: number): Observable<Semester> {
    return this.http.get<Semester>(
      `${environment.apiUrl}/${this.urlPrefix}/${id}`
    );
  }

  public add(semester: Semester): Observable<Semester> {
    return this.http.post<Semester>(
      `${environment.apiUrl}/${this.urlPrefix}`,
      semester
    );
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${this.urlPrefix}/${id}`);
  }

  public update(semester: Semester, id: number): Observable<Semester> {
    return this.http.put<Semester>(
      `${environment.apiUrl}/${this.urlPrefix}/${id}`,
      semester
    );
  }
}
