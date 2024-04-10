import { Injectable } from '@angular/core';
import { API_SERVER } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AtractivoTuristicoService {
  private SERVER_ATRACTIVOS = API_SERVER + '/atractivos-turisticos';

  constructor(
    private http: HttpClient,
  ) { }

  get_atractivos_turisticos(data: any): Observable<any> {
    return this.http.get<any>(this.SERVER_ATRACTIVOS).pipe(
      map((response) => { return response })
    );
  }
  get_atractivos_turisticos_by_name_route(data: any): Observable<any> {
    return this.http.get<any>(this.SERVER_ATRACTIVOS + '/name_route/'+data).pipe(
      map((response) => { return response })
    );
  }
}
