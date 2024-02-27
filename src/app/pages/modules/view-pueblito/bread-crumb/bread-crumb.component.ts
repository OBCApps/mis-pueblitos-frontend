import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-bread-crumb',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bread-crumb.component.html',
  styleUrl: './bread-crumb.component.scss'
})

export class BreadCrumbComponent {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  lugarDetalle: any;
  breadcrumbs: breadCrumb[] = []
  ruta: any;
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('lugar')) {
        this.lugarDetalle = JSON.parse(localStorage.getItem('lugar') || '{}');
        console.log("lugardetalle: ", this.lugarDetalle);


        this.breadcrumbs = [
          {
            name: 'Inicio',
            route: '/home',
            params: null
          },
          {
            name: this.lugarDetalle.departamentoNombre,
            route: '/department',
            params: this.lugarDetalle.departamentoId
          },
          {
            name: this.lugarDetalle.nombre,
            route: '/pueblitos',
            params: null
          }
        ]
        console.log("LIsta", this.breadcrumbs);
      }
    }
    this.ruta = this.extraerSubruta(this.route.snapshot['_routerState'].url);
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const rutaCompleta = this.route.snapshot['_routerState'].url;
      this.ruta = this.extraerSubruta(rutaCompleta);
      console.log('Subruta:', this.ruta);
    });

  }
  extraerSubruta(rutaCompleta: string): string {
    const indicePueblitos = rutaCompleta.indexOf('pueblitos');

    if (indicePueblitos !== -1) {
      // Extraer la parte de la ruta después de 'pueblitos'
      const subruta = rutaCompleta.substring(indicePueblitos + 'pueblitos'.length + 1);

      // Verificar si hay algo después de 'pueblitos'
      return (subruta === '' || subruta === 'meet') ? null : subruta;
    }

    return null;
  }

  goToRoute(bread: any) {
    console.log("BREAD: ", bread);

    if (bread.params !== null) {  // Utilizar !== para comparación
      console.log("aa");

      const queryParamsObject = {
        departmentId: bread.params,
      };
      this.router.navigate([bread.route], { queryParams: queryParamsObject });
    } else {
      console.log("bb");
      this.router.navigate([bread.route]);
    }
  }

}
export class breadCrumb {
  name: string
  route: String
  params: any
  //data: any
};