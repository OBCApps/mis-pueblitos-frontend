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
  breadcrumbs: string[] = [];

  constructor(private router: Router) { }

  ngOnInit() {
    this.updateBreadcrumbs();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => this.updateBreadcrumbs());
  }

  updateBreadcrumbs() {
    this.breadcrumbs = this.router.url.split('?')[0].split('/').filter(Boolean);
  }

  goToRoute(item: string) {
    const index = this.breadcrumbs.indexOf(item);
    if (index !== -1) {
      const routePath = this.breadcrumbs.slice(0, index + 1).join('/');
      this.router.navigate([routePath]);
    } else {
      console.error('El ítem no se encontró en la lista de rutas.');
    }
  }
}
