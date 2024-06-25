import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, Component, Signal, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResturanteService } from '../../../../../../services/restaurante.service';
import { DtoRestaurante } from '../entities/DtoRestaurante';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';
import { LowerCasePipe, NgClass, NgFor } from '@angular/common';
import { BaseComponenst } from '../../../../../../functions/base-components/BaseComponents';

@Component({
  selector: 'app-restaurant-view',
  standalone: true,
  imports: [NgFor, NgClass, LowerCasePipe],
  templateUrl: './restaurant-view.component.html',
  styleUrl: './restaurant-view.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RestaurantViewComponent extends BaseComponenst {
  constructor(
    private restauranteService: ResturanteService,
    private router: Router,
    private readonly route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.load_restaurante(params['restaurante_name']);
    });
  }
  restaurante: DtoRestaurante = new DtoRestaurante();
  load_restaurante(name_route) {
    this.restauranteService.get_restaurante_by_name_route(name_route).subscribe(
      (data: any) => {
        this.restaurante = data;

        this.cdr.detectChanges();
        this.initializeCarruselsSwipes();
      }, err => {
        console.error(err);
      }
    );
  }
  initializeCarruselsSwipes() {
    this.initializeSwiper('infoPhotos', {
      spaceBetween: 10,
      pagination: false,
      navigation: {
        enabled: true,
        nextEl: '.swiperinfoPhotos-button-next',
        prevEl: '.swiperinfoPhotos-button-prev'
      },
      autoplay: {
        delay: 5000, // 5 segundos
        disableOnInteraction: false // Para que el autoplay no se detenga al interactuar con el carrusel
      },
      breakpoints: {
        320: { slidesPerView: 1 },
        640: { slidesPerView: 1 },
        1024: { slidesPerView: 1 },
        1280: { slidesPerView: 1 }
      }
    });

    this.initializeSwiper('menuDates', {
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
        1280: { slidesPerView: 4 }
      }
    });

    this.initializeSwiper('infoMoreBussines', {
      spaceBetween: 10,
      pagination: false,
      breakpoints: {
        320: { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1280: { slidesPerView: 4 }
      }
    });
  }
  get_Keys(obj: any) {
    if (obj === undefined || obj === null) {
      return [];
    } else {
      return Object.keys(obj);

    }
  }

}
