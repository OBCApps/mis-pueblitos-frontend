import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { API_SERVICE_WEB } from '../../../../environments/environment';




@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private SERVER_LOGIN = API_SERVICE_WEB;

    // EL objeto para la recuperacion de datos
    public recoveryData: any;

    constructor(
        private http: HttpClient,
        private router: Router

    ) { }



    login_service(data: any): Observable<any> {
        const headers = { 'No-Auth': 'True' };
        return this.http.post<any>(this.SERVER_LOGIN + '/user-consumer/login', data, { headers });
    }

    sent_email_recovery_service(data: any): Observable<any> {
        return this.http.post<any>(this.SERVER_LOGIN + 'login/enviarcorreo', data);
    }

    change_password_recovery_service(data: any): Observable<any> {
        return this.http.post<any>(this.SERVER_LOGIN + 'login/cambiarclaveestudiante', data);
    }

    cambiarClave(data: any): Observable<any> {
        return this.http.post<any>(this.SERVER_LOGIN + '/cambiarclave', data);
    }

    redirectToLogin() {
        this.router.navigate(['/login']);
    }

    register(data: any): Observable<any> {
        return this.http.post<any>(this.SERVER_LOGIN + '/user-consumer/register', data);
    }


}
