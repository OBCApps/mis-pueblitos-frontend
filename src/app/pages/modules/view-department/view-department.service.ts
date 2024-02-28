import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { API_SERVER } from "../../../../environments/environment.prod";
import { Observable, map } from "rxjs";
import { DtoViewDepartmentAndLugares } from "./structures/DtoViewDepartmentAndLugares";


@Injectable({
    providedIn: 'root'
})
export class ViewDepartmentService {

    private SERVER_LUGAR = API_SERVER + '/lugar';


    constructor(
        private http: HttpClient,

    ) { }


    get_list_lugaresDepartment(idDepartment: any): Observable<DtoViewDepartmentAndLugares> {
        return this.http.get<DtoViewDepartmentAndLugares>(this.SERVER_LUGAR + '/departamento/' + idDepartment).pipe(
            map((response) => { return response })
        );
    }

    get_departament(idDepartment: any): Observable<any> {
        return this.http.get<any>(API_SERVER + '/departamento/' + idDepartment).pipe(
            map((response) => { return response })
        );
    };



}
