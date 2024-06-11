import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, Component, ViewChild, signal } from '@angular/core';
import { HabitacionService } from '../../../../../../services/habitacion.service';
import { ActivatedRoute, Router } from '@angular/router';
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
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
  ) { }

  name_route = '';
  dtoHabitacionInfo: DtoHabitacion = new DtoHabitacion();
  loading = false;

  Params: any;
  ngOnInit() {

    this.name_route = this.router.url.split('/').pop();
    this.loading = true;

    this.getHabitacion();

  }

  getHabitacion() {
    this.habitacionService.get_habitacion_by_name_route(this.name_route).subscribe(
      (response: DtoHabitacion) => {
        this.dtoHabitacionInfo = response;

        this.cdr.detectChanges();
        this.createinfoPhotosCarrusel();
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

  goToHotel() {
    console.log("Params", this.Params);
    const routeHotel = this.router.url.split('/').slice(0, -1).join('/');
    this.router.navigate([routeHotel])
  }
}
