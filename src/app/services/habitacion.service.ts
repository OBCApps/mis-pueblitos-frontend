import { Injectable } from '@angular/core';
import { API_SERVER } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { FiltroHabitaciones } from '../pages/modules/view-pueblito/services-activities/entities/filtroGeneralServicios';
import { Habitacion } from '../pages/modules/view-pueblito/services-activities/hospedajes/habitacion-view/entities/DtoHabitacion';

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

  get_habitaciones_byFiltro(filtro : FiltroHabitaciones): Observable<any[]> {
    return this.http.post<any[]>(this.SERVER_HABITACION , filtro).pipe(
      map((response) => { return response })
    );
  }

  get_habitacion_by_id(data: any): Observable<any> {
    return this.http.get<any>(this.SERVER_HABITACION + '/' + data).pipe(
      map((response) => { return response })
    );
  }

  get_habitacion_by_name_route(name_route: any): Observable<Habitacion> {
    return this.http.get<Habitacion>(this.SERVER_HABITACION + '/name_route/' + name_route).pipe(
      map((response) => { return response })
    );
  }

}
