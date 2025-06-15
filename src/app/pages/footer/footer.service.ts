import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_SERVICE_WEB } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FooterService {

  private urlSuscripcion = API_SERVICE_WEB + '/usuario-suscrito';

  constructor(private http: HttpClient) { }

  suscribirse(email: string): Observable<any> {
    return this.http.post<any>(this.urlSuscripcion, { email });
  }
}
