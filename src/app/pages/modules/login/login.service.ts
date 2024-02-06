import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
    providedIn: 'root'
})
export class  LoginService{

    private user = 'https://erp-ransa-backend.onrender.com/representante';

    constructor(
        private http: HttpClient,

    ) { }


    getUsers() {
        
        return this.http.get(this.user);
    }

    createUsers(data : any) {
           
        return this.http.post(this.user, data);
    }

    updateUsers(data : any) {
         
        return this.http.put(this.user, data);
    }

    deleteUsers(data : any) {           
        return this.http.delete(this.user + '/' + data.id);
    }



}
