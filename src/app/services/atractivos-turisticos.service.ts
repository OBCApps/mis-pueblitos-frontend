import { Injectable } from '@angular/core';
import { API_SERVICE_WEB } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { DtoAtractivo, DtoAtractivos } from '../pages/modules/view-pueblito/services-activities/atractivos-turisticos/entities/DtoAtractivos';

@Injectable({
  providedIn: 'root'
})
export class AtractivoTuristicoService {
  private SERVER_ATRACTIVOS = API_SERVICE_WEB + '/atractivos-turisticos/';

  constructor(
    private http: HttpClient,
  ) { }

  get_atractivos_turisticospaginado(data: any): Observable<any> {
    return this.http.post<any>(`${this.SERVER_ATRACTIVOS}filter_pagination`, data).pipe(
      map((response) => { return response })
    );
  }
  get_atractivos_turisticos_by_name_route(name_route: any): Observable<DtoAtractivo> {
    return this.http.get<DtoAtractivo>(`${this.SERVER_ATRACTIVOS}findDto_byNameRoute/${name_route}`).pipe(
      map((response) => { return response })
    );
  }
}
