import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthorizationService } from "./auth.service";
import { Title } from "@angular/platform-browser";
import { ConstanteModuleEstudiante } from "../../../modules/ConstanteModuleEstudiante";


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private authorizationService: AuthorizationService,
    private router: Router,
    private title: Title
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.authorizationService.getToken();
    const user = this.authorizationService.getUserSesion();

    if (user?.tipousuario == 'PER_ESTUDIANTE') {
      this.title.setTitle('PortalEstudiante');
    }
    if (user?.tipousuario == 'PER_DOCENTE') {
      this.title.setTitle('PortalDocente');
    }

    /* if (token) {
      return true; // Usuario autenticado, permite la navegación
    } else {
     
      this.authorizationService.clear_all();
      this.router.navigate([ConstanteModuleEstudiante.login], { queryParams: { returnUrl: state.url } });

      return false; 
    } */
    if (token) {
      return true; // Usuario autenticado, permite la navegación
    }
    //this.router.navigate([ConstanteModuleEstudiante.login]);
    return false;
  }
}
