import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private user = 'https://erp-ransa-backend.onrender.com/area';

    constructor(
        private http: HttpClient,

    ) { }


    getUsers() {
        console.log("ENTRANDO SERVICIO: " , this.user);
        
        return this.http.get(this.user);
    }



}
