import { Injectable } from '@angular/core';
import { API_SERVICE_WEB } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { FiltroRestaurantes } from '../pages/modules/view-pueblito/services-activities/entities/filtroGeneralServicios';
import { DtoRestaurante } from '../pages/modules/view-pueblito/services-activities/restaurantes/entities/DtoRestaurante';

@Injectable({
  providedIn: 'root'
})
export class ResturanteService {
  private SERVER_REST = API_SERVICE_WEB + '/restaurante';

  constructor(
    private http: HttpClient,
  ) { }

  get_restaurantes(): Observable<DtoRestaurante[]> {
    return this.http.get<DtoRestaurante[]>(this.SERVER_REST).pipe(
      map((response) => { return response })
    );
  }

  get_restaurantes_byFiltro(filtro : FiltroRestaurantes): Observable<DtoRestaurante[]> {
    return this.http.post<DtoRestaurante[]>(`${this.SERVER_REST}/filter`, filtro).pipe(
      map((response) => { return response })
    );
  }

  get_restaurante_by_id(data: any): Observable<DtoRestaurante> {
    return this.http.get<DtoRestaurante>(this.SERVER_REST + '/' + data).pipe(
      map((response) => { return response })
    );
  }

  get_restaurante_by_name_route(name_route: any): Observable<DtoRestaurante> {
    return this.http.get<DtoRestaurante>(this.SERVER_REST + '/name_route/' + name_route).pipe(
      map((response) => { return response })
    );
  }

}
