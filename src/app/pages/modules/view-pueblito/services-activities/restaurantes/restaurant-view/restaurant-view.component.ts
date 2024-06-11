import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, Component, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResturanteService } from '../../../../../../services/restaurante.service';
import { DtoRestaurante } from '../entities/DtoRestaurante';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-restaurant-view',
  standalone: true,
  imports: [NgFor],
  templateUrl: './restaurant-view.component.html',
  styleUrl: './restaurant-view.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RestaurantViewComponent {
  constructor(
    private restauranteService: ResturanteService,
    private router: Router,
    private readonly route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.load_restaurante(params['restaurante_name']);
    });
  }
  restaurante: DtoRestaurante;
  load_restaurante(name_route) {
    this.restauranteService.get_restaurante_by_name_route(name_route).subscribe(
      (data: any) => {
        this.restaurante = data;

        this.cdr.detectChanges();
        this.createinfoPhotosCarrusel();
        this.createMenuCarrusel()
      }, err => {
        console.error(err);
      }
    );
  }

  get_Keys(data: any) {
    console.log(Object.keys(data));
    return Object.keys(data);
  }
  swiperElement1 = signal<SwiperContainer | null>(null);
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
        this.swiperElement1.set(swiperElemConstructor as SwiperContainer)
        this.swiperElement1().initialize()
      }
    }
  }

  swiperMenuElement = signal<SwiperContainer | null>(null);
  createMenuCarrusel() {
    if (typeof document !== 'undefined') {
      const swiperElemConstructor = document.getElementById('menuDates');
      if (swiperElemConstructor) {
        const swiperOPtions: SwiperOptions = {
          spaceBetween: 15,
          pagination: false,
          navigation: {
            enabled: true,
            nextEl: '.swiper-buttonMenu-next',
            prevEl: '.swiper-buttonMenu-prev'
          },
          breakpoints: {
            320: { slidesPerView: 1 },
            640: { slidesPerView: 1 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },

          }
        }
        Object.assign(swiperElemConstructor, swiperOPtions);
        this.swiperMenuElement.set(swiperElemConstructor as SwiperContainer)
        this.swiperMenuElement().initialize()
      }
    }
  }
}
