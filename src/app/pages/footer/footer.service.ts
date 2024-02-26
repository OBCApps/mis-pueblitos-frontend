import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_SERVER } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FooterService {

  private urlSuscripcion = API_SERVER + '/usuario-suscrito';

  constructor(private http: HttpClient) { }

  suscribirse(email: string): Observable<any> {
    return this.http.post<any>(this.urlSuscripcion, { email });
  }
}
