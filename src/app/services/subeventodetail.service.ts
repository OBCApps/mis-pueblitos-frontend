import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { API_SERVER } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class SubEventoDetailService {
  constructor(private http: HttpClient) {}

  getSubEvento(id:any): Observable<any> {
    return this.http.get(`${API_SERVER}/sub-evento/${id}`).pipe(
      map((response) => {
        return response;
      })
    );
  }

}
