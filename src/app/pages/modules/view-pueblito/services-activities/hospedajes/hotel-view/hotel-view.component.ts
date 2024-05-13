import { CUSTOM_ELEMENTS_SCHEMA, Component, signal } from '@angular/core';
import { DtoHoteles } from '../entities/DtoHoteles';
import { Router } from '@angular/router';
import { HotelesService } from '../../../../../../services/hoteles.service';
import Swiper from 'swiper';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-hotel-view',
  standalone: true,
  imports: [NgIf],
  templateUrl: './hotel-view.component.html',
  styleUrl: './hotel-view.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HotelViewComponent {
  constructor(
    private readonly hotelesService: HotelesService,
    private router: Router
  ) { }

  dtoHotelInfo: DtoHoteles = new DtoHoteles();
  name_route: string;
  loading = false;
  ngOnInit() {
    this.name_route = this.router.url.split('/').pop();
    console.log('this.name_route', this.name_route);
    this.getHotel(this.name_route);
  }

  getHotel(name_route: string) {
    this.loading = true;
    console.log('name_route', name_route);
    this.hotelesService
      .get_hotel_by_name_route(name_route)
      .subscribe((response) => {
        this.dtoHotelInfo = response;
        console.log('response', response);
        this.loading = false;
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
  swiperElement = signal<SwiperContainer | null>(null);
  createCarrusel() {
    if (typeof document !== 'undefined') {
      const swiperElemConstructor = document.querySelector('swiper-container');
      if (swiperElemConstructor) {
        const swiperOPtions: SwiperOptions = {
          slidesPerView: 5,
          pagination: false,
          //centeredSlides: true,
          navigation: {
            enabled: true,
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          breakpoints: {
            320: { slidesPerView: 2 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 2 },
            1280: { slidesPerView: 2 },

          }
        }
        Object.assign(swiperElemConstructor, swiperOPtions);
        this.swiperElement.set(swiperElemConstructor as SwiperContainer)
        this.swiperElement()?.initialize()
      }
    }
  }
}

