import { Injectable } from '@angular/core';
import { API_SERVER } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HabitacionService {
  private SERVER_HABITACION = API_SERVER + '/habitacion';

  constructor(
    private http: HttpClient,
  ) { }

  get_habitaciones(): Observable<any> {
    return this.http.get<any>(this.SERVER_HABITACION).pipe(
      map((response) => { return response })
    );
  }

  get_habitacion_by_id(data: any): Observable<any> {
    return this.http.get<any>(this.SERVER_HABITACION + '/' + data).pipe(
      map((response) => { return response })
    );
  }

  get_habitacion_by_name_route(name_route: any): Observable<any> {
    return this.http.get<any>(this.SERVER_HABITACION + '/name_route/' + name_route).pipe(
      map((response) => { return response })
    );
  }

}
