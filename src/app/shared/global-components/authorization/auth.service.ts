import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  user_data: string = 'AuthorizacionMisPueblitosWeb';
  temp_data: string = 'TemporalDataBritanicoPortal';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) { }

  // --------- Autorizacion de la web
  getUserSesion() {
    if (isPlatformBrowser(this.platformId)) {
      const user = JSON.parse(sessionStorage.getItem(this.user_data));
      return user; // Retorna todo el objeto que esta dentro del SessionStorage
    } else {
      return null;
    }
  }

  getToken() {
    if (!isPlatformBrowser(this.platformId)) return null;

    const user = JSON.parse(sessionStorage.getItem(this.user_data));
    return user?.token || null;
  }

  setUserSesion(token: any) {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem(this.user_data, token);
    }
  }

  deleteUserSesion() {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem(this.user_data);
    }
  }

  // --------- Información temporal para el uso del portal
  setTemporalData(data: any) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.temp_data, JSON.stringify(data));
    }
  }

  getTemporalData() {
    if (isPlatformBrowser(this.platformId)) {
      const data = JSON.parse(localStorage.getItem(this.temp_data));
      return data; // Retorna todo el objeto que esta dentro del SessionStorage
    }
  }

  deleteTemporalData() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.temp_data);
    }
  }



  redirectToLogin() {
    this.deleteUserSesion();
    this.deleteTemporalData();
    this.router.navigate(['/login']);
  }


  ifPlatform(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return true;
    } else {
      return false;
    }
  }

  clear_all() {
    this.deleteTemporalData();
    this.deleteUserSesion();
  }


}

