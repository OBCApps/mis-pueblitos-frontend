import { CUSTOM_ELEMENTS_SCHEMA, Component, ViewChild, signal } from '@angular/core';
import { HabitacionService } from '../../../../../../services/habitacion.service';
import { Router } from '@angular/router';
import { DtoHabitacion } from './entities/DtoHabitacion';
import { SwiperOptions } from 'swiper/types';
import { NgFor } from '@angular/common';
import Swiper from 'swiper';
import { SwiperContainer } from 'swiper/element';

@Component({
  selector: 'app-habitacion-view',
  standalone: true,
  imports: [NgFor],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './habitacion-view.component.html',
  styleUrl: './habitacion-view.component.scss',
})
export class HabitacionViewComponent {
  constructor(
    private router: Router,
    private habitacionService: HabitacionService,
  ) { }

  name_route = '';
  dtoHabitacionInfo: DtoHabitacion = new DtoHabitacion();
  loading = false;

  ngOnInit() {
    this.createCarrusel();
    this.name_route = this.router.url.split('/').pop();
    this.loading = true;

    this.getHabitacion();

  }

  getHabitacion() {
    this.habitacionService.get_habitacion_by_name_route(this.name_route).subscribe(
      (response: DtoHabitacion) => {
        this.dtoHabitacionInfo = response;


        this.loading = false;
      },
      (error) => {
        console.log('error', error);
        this.loading = false;
      }
    );
  }

  get_Keys(obj: any) {
    if (obj === undefined || obj === null) {
      return [];
    } else {
      return Object.keys(obj);

    }
  }

  swiperElement = signal<SwiperContainer | null>(null);


  createCarrusel() {
    const swiperElemConstructor = document.getElementById('devSlider');
    if (swiperElemConstructor) {
      const swiperOptions: SwiperOptions = {
        slidesPerView: 5,
        pagination: false,
        centeredSlides: true,
        navigation: {
          enabled: true,
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        breakpoints: {
          320: { slidesPerView: 3 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }
      };

      if (this.swiperElement()) {
        this.swiperElement()?.remove(); // Eliminar el Swiper existente
      }

      const swiper = new Swiper(swiperElemConstructor, swiperOptions);
      Object.assign(swiperElemConstructor, swiperOptions);
      this.swiperElement.set(swiperElemConstructor as SwiperContainer)
      this.swiperElement()?.initialize()
    }
  }


}
