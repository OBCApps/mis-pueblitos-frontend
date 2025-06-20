import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { API_SERVICE_WEB } from "../../../../environments/environment";
import { Observable, map } from "rxjs";
import { DtoViewDepartmentAndLugares } from "./structures/DtoViewDepartmentAndLugares";


@Injectable({
    providedIn: 'root'
})
export class ViewDepartmentService {

    private SERVER_LUGAR = API_SERVICE_WEB + '/lugar';


    constructor(
        private http: HttpClient,

    ) { }


    get_list_lugaresDepartment(idDepartment: any): Observable<DtoViewDepartmentAndLugares> {
        return this.http.get<DtoViewDepartmentAndLugares>(this.SERVER_LUGAR + '/departamento/' + idDepartment).pipe(
            map((response) => { return response })
        );
    }

    get_departament_name_route(idDepartment: any): Observable<any> {
        return this.http.get<any>(API_SERVICE_WEB + '/departamento/name_route/' + idDepartment).pipe(
            map((response) => { return response })
        );
    };



}
