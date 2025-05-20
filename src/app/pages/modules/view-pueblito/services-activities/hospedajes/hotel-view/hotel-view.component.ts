import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, Component, signal } from '@angular/core';
import { DtoHoteles } from '../entities/DtoHoteles';
import { Router } from '@angular/router';
import { HotelesService } from '../../../../../../services/hoteles.service';
import Swiper from 'swiper';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';
import { NgFor, NgIf } from '@angular/common';
import { BaseServices } from '../../../../../../shared/global-components/BaseServices';
import { UsuariosContactadosMastService } from '../../../../../../services/usuarios-contactados.service';


@Component({
  selector: 'app-hotel-view',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './hotel-view.component.html',
  styleUrl: './hotel-view.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HotelViewComponent {
  constructor(
    private readonly hotelesService: HotelesService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private baseServices: BaseServices,
    private usuariosContactadosMastService: UsuariosContactadosMastService,
  ) { }

  dtoHotelInfo: DtoHoteles = new DtoHoteles();
  name_route: string;
  loading = false;
  ngOnInit() {

    this.name_route = this.router.url.split('/').pop();
    this.getHotel(this.name_route);
  }

  getHotel(name_route: string) {
    this.baseServices.showLoading();
    this.hotelesService.get_hotel_by_name_route(name_route).subscribe(
      (response) => {
        this.baseServices.hideLoading();
        this.dtoHotelInfo = response;
        this.loading = false;

        // Forzar detección de cambios
        this.cdr.detectChanges();
        this.createinfoPhotosCarrusel();
      }, err => {
        this.baseServices.hideLoading();
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

  contactarNegocio() {
    if (!this.dtoHotelInfo.celular || this.dtoHotelInfo.celular == "") {
      this.baseServices.showMessageWarning('El negocio no tiene un contacto agreado.')
    }

    const inputCreate = { tipoNegocio: "HOSP", nameRoute: this.dtoHotelInfo.name_route }

    this.baseServices.showLoading();
    this.usuariosContactadosMastService.create(inputCreate).subscribe(
      response => {
        this.baseServices.hideLoading();

        const numero = this.dtoHotelInfo.celular; // Reemplaza con el número real en formato internacional
        const mensaje = '¡Hola! \n Encontré su hospedaje en la página Mis Pueblitos. \n Me gustaría saber la disponibilidad y los precios, por favor.';
        const mensajeCodificado = encodeURIComponent(mensaje);

        const url = `https://wa.me/${numero}?text=${mensajeCodificado}`;
        window.open(url, '_blank');


      },
      err => {
        this.baseServices.showLoading();
        console.log("ERROR AL REGISTRAR", err);

      }
    )

  }
}

