import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-bread-crumb',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bread-crumb.component.html',
  styleUrl: './bread-crumb.component.scss'
})

export class BreadCrumbComponent {
  rutaActual: string = '';
  breadcrumbs: any[] = []
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.rutaActual = this.router.url;
    this.breadcrumbs = this.rutaActual.split('/').filter(segment => segment !== '');
   
    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.rutaActual = this.router.url;
      this.breadcrumbs = this.rutaActual.split('/').filter(segment => segment !== '');
      console.log("LISTA DESPUES: ", this.breadcrumbs);
    });
  }

  goToRoute(item : any){
    
    const indice = this.breadcrumbs.indexOf(item);

    // Verifica si el ítem está presente en la lista
    if (indice !== -1) {
      // Filtra la lista para incluir solo las rutas hasta el ítem actual
      const rutasHastaItem = this.breadcrumbs.slice(0, indice + 1);

      // Navega a la ruta construida
      this.router.navigate(rutasHastaItem);
    } else {
      console.error('El ítem no se encontró en la lista de rutas.');
    }
  }
}
