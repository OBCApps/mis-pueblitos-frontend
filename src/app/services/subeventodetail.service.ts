import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { API_SERVER } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class EventoService {
  constructor(private http: HttpClient) {}

  getEvento(id:any): Observable<any> {
    return this.http.get(`${API_SERVER}/evento/${id}`).pipe(
      map((response) => {
        return response;
      })
    );
  }
  getEventoByNameRoute(id:any): Observable<any> {
    return this.http.get(`${API_SERVER}/evento/name_route/${id}`).pipe(
      map((response) => {
        return response;
      })
    );
  }
  getSubEvento(id:any): Observable<any> {
    return this.http.get(`${API_SERVER}/sub-evento/${id}`).pipe(
      map((response) => {
        return response;
      })
    );
  }

}
