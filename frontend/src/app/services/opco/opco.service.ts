import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OpcoService {

  private urlPrefix = "api/v1/opco";
  private  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private http: HttpClient) { }


public getAll(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${this.urlPrefix}`);
}

public add(post: any): Observable<any> {

    return this.http.post<any>(`${environment.apiUrl}/${this.urlPrefix}/add`, post, this.httpOptions);

}
}
