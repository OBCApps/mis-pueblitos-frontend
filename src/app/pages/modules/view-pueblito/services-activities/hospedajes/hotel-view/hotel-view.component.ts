import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, Component, signal } from '@angular/core';
import { DtoHoteles } from '../entities/DtoHoteles';
import { Router } from '@angular/router';
import { HotelesService } from '../../../../../../services/hoteles.service';
import Swiper from 'swiper';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';
import { NgFor, NgIf } from '@angular/common';


@Component({
  selector: 'app-hotel-view',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './hotel-view.component.html',
  styleUrl: './hotel-view.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HotelViewComponent {
  constructor(
    private readonly hotelesService: HotelesService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  dtoHotelInfo: DtoHoteles = new DtoHoteles();
  name_route: string;
  loading = false;
  ngOnInit() {

    this.name_route = this.router.url.split('/').pop();
    this.getHotel(this.name_route);
  }

  getHotel(name_route: string) {
    this.loading = true;
    console.log('name_route', name_route);
    this.hotelesService.get_hotel_by_name_route(name_route)
      .subscribe((response) => {
        this.dtoHotelInfo = response;
        this.loading = false;

        // Forzar detección de cambios
        this.cdr.detectChanges();
        this.createinfoPhotosCarrusel();
      });
  }

  gotoHabitacion(hotel_name, habitacion_name) {
    this.router.navigate([this.router.url, habitacion_name]);
  }

  get_Keys(obj: any) {
    if (obj === undefined || obj === null) {
      return [];
    } else {
      return Object.keys(obj);
    }
  }


  title: any
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
}

