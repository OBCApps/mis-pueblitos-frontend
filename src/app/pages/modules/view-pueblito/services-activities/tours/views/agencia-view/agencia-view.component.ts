import { ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { ToursService } from '../../../../../../../services/tours.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutesCreated } from '../../../../view-pueblito.service';
import { DtoAgenciaView } from '../../models/DtoAgenciaView';
import { NgFor } from '@angular/common';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';
import { LoadingService } from '../../../../../../../shared/global-components/loadings/loading-service.service';

@Component({
  selector: 'app-agencia-view',
  standalone: true,
  imports: [NgFor],
  templateUrl: './agencia-view.component.html',
  styleUrl: './agencia-view.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AgenciaViewComponent {
  constructor(
    private readonly toursService: ToursService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly loading: LoadingService,
    private cdr: ChangeDetectorRef
  ) { }

  agenciaView: DtoAgenciaView = new DtoAgenciaView();

  routesCreated: RoutesCreated = new RoutesCreated()
  ngOnInit() {
    this.route.params.subscribe((params) => {    
      this.routesCreated.agencia_name = params['agencia_name'];      
      this.loadAgencia(this.routesCreated.agencia_name);
    });

    this.route.parent.params.subscribe(params => {
      this.routesCreated.departamento = params['departamento'];
      this.routesCreated.lugar = params['lugar'];
    });
  }

  loadAgencia(agencia_name: string) {
    this.loading.show();
    this.toursService.get_agencia_by_name_route(agencia_name).subscribe(
      (data: DtoAgenciaView) => {
        this.agenciaView = data;
        this.cdr.detectChanges(); 
        this.createinfoPhotosCarrusel()
       
        this.loading.hide();
      },
      (err) => {
        this.loading.hide();
      }
    );
  }

  gotoTour(item: any) {
    this.router.navigate([
      'home',
      this.routesCreated.departamento,
      this.routesCreated.lugar,
      'servicios',
      'tour',
      this.agenciaView.name_route,
      item.name_route,
    ]);
  }

  swiperElement = signal<SwiperContainer | null>(null);
  createinfoPhotosCarrusel() {
    if (typeof document !== 'undefined') {
      const swiperElemConstructor = document.getElementById('infoPhotos');
      if (swiperElemConstructor) {
        const swiperOPtions: SwiperOptions = {
          spaceBetween: 10,
          pagination: false,
          navigation: {
            enabled: true,
            nextEl: '.swiperinfoPhotos-button-next',
            prevEl: '.swiperinfoPhotos-button-prev'
          },
          autoplay: {
            delay: 5000, // 3 segundos
            disableOnInteraction: false // Para que el autoplay no se detenga al interactuar con el carrusel
          },
          breakpoints: {
            320: { slidesPerView: 1 },
            640: { slidesPerView: 1 },
            1024: { slidesPerView: 1 },
            1280: { slidesPerView: 1 },

          }
        }
        Object.assign(swiperElemConstructor, swiperOPtions);
        this.swiperElement.set(swiperElemConstructor as SwiperContainer)
        this.swiperElement().initialize()
      }
    }
  }
}
