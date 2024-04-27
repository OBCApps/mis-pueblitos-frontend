import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { API_SERVICE_WEB } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class LugarService {
  constructor(private http: HttpClient) { }

  getLugares(id: any): Observable<any> {
    return this.http.get(`${API_SERVICE_WEB}/lugar/${id}`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  getLugarByNameRoute(id: any): Observable<any> {
    return this.http.get(`${API_SERVICE_WEB}/lugar/name_route/${id}`).pipe(
      map((response) => {
        return response;
      })
    );
  }
}
