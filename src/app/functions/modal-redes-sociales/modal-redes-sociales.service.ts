import { Injectable } from "@angular/core";
import { Observable, Subject, map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { API_SERVICE_WEB } from "../../../environments/environment.prod";
@Injectable({
    providedIn: 'root', // O especifica un módulo específico si es necesario
})
export class ModalRedesSocialesService {
    constructor(
        private http: HttpClient,
    ) { }

    private modalSubject = new Subject<any>();
    modalState$ = this.modalSubject.asObservable();
    activateModal(option: any) {
        this.modalSubject.next(option);
    }
    
    /* 
        private SERVER_PROVEEDOR = API_SERVICE_WEB + '/proveedor';
    
    
        public getProveedorByID(IdProveedor: any): Observable<any> {
            return this.http.get<any>(this.SERVER_PROVEEDOR + `/${IdProveedor}`).pipe(
                map((response) => { return response })
            );
        } */

}