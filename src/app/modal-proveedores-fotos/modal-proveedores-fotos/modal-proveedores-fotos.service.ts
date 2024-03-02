import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { API_SERVER } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ModalProveedoresFotosService {
  //servicio Api proveedoor

  private urlproveedor = API_SERVER + '/proveedor';

  constructor(private http: HttpClient) {}

  get_list_proveedor(): Observable<any> {
    return this.http.get<any>(this.urlproveedor).pipe(
      map((response) => {
        return response;
      })
    );
  }
}
