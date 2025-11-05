import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthorizationService } from './auth.service';
import { ToastService } from '../toast/toast.service';
import { DtoInfoLoged } from './dto.info.loged';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private storage: AuthorizationService,
    private toastService: ToastService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.storage.getToken();
    const usersesion = this.storage.getUserSesion();

    if (!token) {

      // -------- Validamos que sea una plataforma valida0'u78
      if (!this.storage.ifPlatform()) { // Si es desde el terminal
        return EMPTY;

      } else { // Si es desde un navegador

      }

    }


    const headers: { [key: string]: string } = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    if (usersesion) {
      headers['Id-Persona'] = String(usersesion.personaId);
    }

    const request = req.clone({
      setHeaders: headers,
    });

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleHttpError(error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Manejo centralizado de errores HTTP.
   * @param error El error HTTP capturado
   */
  private handleHttpError(error: HttpErrorResponse): void {
    switch (error.status) {
      case 0:
        this.toastService?.addToast({
          type: 'danger',
          message: 'No se pudo conectar con el servidor. Verifica tu conexión a internet.',
        });
        break;

      case 401:
        this.toastService?.addToast({
          type: 'danger',
          message: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
        });
        this.storage.redirectToLogin();

        break;
      case 403:
        this.toastService?.addToast({
          type: 'danger',
          message: 'No tienes permisos para acceder a este recurso.',
        });
        break;


    }
  }
}