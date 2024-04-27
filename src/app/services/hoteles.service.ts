import { Injectable } from '@angular/core';
import { API_SERVICE_WEB } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelesService {
  private SERVER_HOTEL = API_SERVICE_WEB + '/hoteles';

  constructor(
    private http: HttpClient,
  ) { }

  get_hoteles(): Observable<any> {
    return this.http.get<any>(this.SERVER_HOTEL).pipe(
      map((response) => { return response })
    );
  }

  get_hotel_by_id(data: any): Observable<any> {
    return this.http.get<any>(this.SERVER_HOTEL + '/' + data).pipe(
      map((response) => { return response })
    );
  }

  get_hotel_by_name_route(name_route: any): Observable<any> {
    return this.http.get<any>(this.SERVER_HOTEL + '/name_route/' + name_route).pipe(
      map((response) => { return response })
    );
  }

  update_hotel(data: any): Observable<any> {
    return this.http.patch<any>(this.SERVER_HOTEL + '/' + data.id, data).pipe(
      map((response) => { return response })
    );
  }

  delete_hotel(data: any): Observable<any> {
    return this.http.delete<any>(this.SERVER_HOTEL + '/' + data.id).pipe(
      map((response) => { return response })
    );
  }


}
