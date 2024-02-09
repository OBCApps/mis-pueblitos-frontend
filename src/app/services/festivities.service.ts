import { Injectable } from '@angular/core';
import { API_SERVER } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FestivitiesService {
  private SERVER_SUBEVENTO = API_SERVER + '/sub-evento';

  constructor(
    private http: HttpClient,
  ) { }

  search_events_dia(data: any): Observable<any> {
    return this.http.post<any>(this.SERVER_SUBEVENTO + '/filter', data).pipe(
      map((response) => { return response })
    );
  }
}
