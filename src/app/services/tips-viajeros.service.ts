import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { API_SERVER } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class TipsViajerosService {
  private SERVER_TIPS_VIAJEROS = API_SERVER + '/tips-viajeros';
  constructor(private http: HttpClient) {}

  getTipsByLugarId(id:any): Observable<any> {
    return this.http.get(`${this.SERVER_TIPS_VIAJEROS}/by-lugar/${id}`).pipe(
      map((response) => {
        return response;
      })
    );
  }
}
