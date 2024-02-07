import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class  ViewDepartmentService{

    private Department = 'https://mis-pueblitos-backend.onrender.com/departamento';

    constructor(
        private http: HttpClient,

    ) { }


    getDepartments() {
        
        return this.http.get(this.Department);
    }

    createDepartments(data : any) {
           
        return this.http.post(this.Department, data);
    }

    updateDepartments(data : any) {
         
        return this.http.put(this.Department, data);
    }

    deleteDepartments(data : any) {           
        return this.http.delete(this.Department + '/' + data.id);
    }



}
