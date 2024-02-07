import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { API_SERVER } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private SERVER_DEPARTMENT = API_SERVER + '/departamento';
  private SERVER_LUGAR_DEPA = API_SERVER + '/lugar/departamento';
  private SERVER_SEARCH = API_SERVER + '/buscar';
  constructor(
    private http: HttpClient,
  ) { }


  get_list_department(): Observable<any> {
    return this.http.get<any>(this.SERVER_DEPARTMENT).pipe(
      map((response) => { return response })
    );
  }

  get_list_lugar(data: any): Observable<any> {
    return this.http.get<any>(this.SERVER_LUGAR_DEPA + '/' + data).pipe(
      map((response) => { return response })
    );
  }

  search_listado_pueblitos(data: any): Observable<any> {
    return this.http.post<any>(this.SERVER_SEARCH, data).pipe(
      map((response) => { return response })
    );
  }
}
