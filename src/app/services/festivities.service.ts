import { Injectable } from '@angular/core';
import { API_SERVICE_WEB } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FestivitiesService {
  private SERVER_EVENTO = API_SERVICE_WEB + '/evento';
  private SERVER_SUBEVENTO = API_SERVICE_WEB + '/sub-evento';

  constructor(
    private http: HttpClient,
  ) { }

  search_events_dia(data: any): Observable<any> {
    return this.http.post<any>(this.SERVER_SUBEVENTO + '/filter', data).pipe(
      map((response) => { return response })
    );
  }

  search_evento_nombre(data: any): Observable<any> {
    return this.http.post<any>(this.SERVER_EVENTO + '/filterbyname', data).pipe(
      map((response) => { return response })
    );
  }

}
