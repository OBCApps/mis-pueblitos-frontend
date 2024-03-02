import { Injectable } from "@angular/core";
import { Observable, Subject, map } from "rxjs";
import { HttpClient } from "@angular/common/http";
@Injectable({
    providedIn: 'root', // O especifica un módulo específico si es necesario
})
export class ModalProveedorService {
    constructor(
        private http: HttpClient,
    ) { }
    
    private modalSubject = new Subject<any>();
    modalState$ = this.modalSubject.asObservable();
    activateModal(option: any) {
        this.modalSubject.next(option);
    }

    //private API_SERVER_COMUN_DEPARTAMENTO= API_SERVER_COMUN + '/spring/core/mcccentroestudiomast';


    /* public listarubigeoporfiltro(dto: FiltroComunUbigeo): Promise<DominioPaginacion> {
        return this.config.getHttp().post(this.url + 'listarubigeoporfiltro', dto)
            .toPromise()
            .then(response => response as DominioPaginacion)
            .catch(error => new DominioPaginacion());

    } */
    /* public listarCentrosEstudioporfiltro(dto: FiltroComunCentroEstudio): Observable<DominioPaginacion> {
        return this.http.put<DominioPaginacion>(this.API_SERVER_COMUN_DEPARTAMENTO + '/listarpaginado', dto).pipe(
            map((response) => { return response })
        );
    } */
}