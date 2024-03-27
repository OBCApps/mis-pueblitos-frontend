import { Injectable } from '@angular/core';
import { API_SERVER } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToursService {
  private SERVER_TOURS = API_SERVER + '/tour';
  private SERVER_AGENCIA = API_SERVER + '/agencia';

  constructor(
    private http: HttpClient,
  ) { }

  filter_tours(data: any): Observable<any> {
    return this.http.post<any>(this.SERVER_TOURS + '/filter', data).pipe(
      map((response) => { return response })
    );
  }

  get_tours(): Observable<any> {
    return this.http.get<any>(this.SERVER_TOURS).pipe(
      map((response) => { return response })
    );
  }

  get_tour_by_id(data: any): Observable<any> {
    return this.http.get<any>(this.SERVER_TOURS + '/' + data).pipe(
      map((response) => { return response })
    );
  }

  get_tour_by_name_route(name_route: any): Observable<any> {
    return this.http.get<any>(this.SERVER_TOURS + '/name_route/' + name_route).pipe(
      map((response) => { return response })
    );
  }

  get_agencia_by_name_route(name_route: any): Observable<any> {
    return this.http.get<any>(this.SERVER_AGENCIA + '/name_route/' + name_route).pipe(
      map((response) => { return response })
    );
  }

}
