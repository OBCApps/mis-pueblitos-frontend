import { Injectable } from '@angular/core';
import { API_SERVICE_WEB } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosContactadosMastService {
  private SERVER = API_SERVICE_WEB + '/UsuariosContactadosMast';

  constructor(
    private http: HttpClient,
  ) { }

  create(data: any): Observable<any> {
    return this.http.post<any>(`${this.SERVER}/create`, data).pipe(
      map((response) => response)
    );
  }

  findAll(): Observable<any> {
    return this.http.get<any>(`${this.SERVER}/findAll`).pipe(
      map((response) => response)
    );
  }

  findOne(id: string): Observable<any> {
    return this.http.get<any>(`${this.SERVER}/findDto_byId${id}`).pipe(
      map((response) => response)
    );
  }

  update(id: string, data: any): Observable<any> {
    return this.http.patch<any>(`${this.SERVER}/update/${id}`, data).pipe(
      map((response) => response)
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.SERVER}/delete/${id}`).pipe(
      map((response) => response)
    );
  }
}
