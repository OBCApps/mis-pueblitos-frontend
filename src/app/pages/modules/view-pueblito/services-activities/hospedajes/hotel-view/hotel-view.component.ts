import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, Component, signal } from '@angular/core';
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
        this.createCarrusel();
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
      const swiperElemConstructor = document.getElementById('perfilPhotos');
      if (swiperElemConstructor) {
        const swiperOPtions: SwiperOptions = {
        
          pagination: false,
          navigation: {
            enabled: true,
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
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

