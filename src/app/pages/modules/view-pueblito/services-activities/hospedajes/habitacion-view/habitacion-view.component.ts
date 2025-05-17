import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, Component, ViewChild, signal } from '@angular/core';
import { HabitacionService } from '../../../../../../services/habitacion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DtoHabitacion } from './entities/DtoHabitacion';
import { SwiperOptions } from 'swiper/types';
import { NgFor } from '@angular/common';
import Swiper from 'swiper';
import { SwiperContainer } from 'swiper/element';
import { HotelesService } from '../../../../../../services/hoteles.service';
import { DtoHoteles } from '../entities/DtoHoteles';
import { UsuariosContactadosMastService } from '../../../../../../services/usuarios-contactados.service';
import { BaseServices } from '../../../../../../shared/global-components/BaseServices';

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
    private hotelesService: HotelesService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private baseServices: BaseServices,
    private usuariosContactadosMastService: UsuariosContactadosMastService
  ) { }

  name_route = '';
  dtoHabitacionInfo: DtoHabitacion = new DtoHabitacion();
  dtoHospedaje: DtoHoteles = new DtoHoteles();
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
        this.load_hospedajeById();
        this.loading = false;
      },
      (error) => {

        this.loading = false;
      }
    );
  }

  load_hospedajeById() {
    if (!this.dtoHabitacionInfo.hotelId) {
      console.log("mensaje: 'La habitación no tiene un Hospedaje asignado'",);

    }

    this.hotelesService.get_hotel_by_id(this.dtoHabitacionInfo.hotelId).subscribe(
      (response: DtoHoteles) => {

        this.dtoHospedaje = response;
        this.cdr.detectChanges();
        this.loading = false;
      },
      (error) => {

        this.loading = false;
      }
    );
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
    const routeHotel = this.router.url.split('/').slice(0, -1).join('/');
    this.router.navigate([routeHotel])
  }

  contactarNegocio() {
    if (!this.dtoHospedaje.celular || this.dtoHospedaje.celular == "") {
      this.baseServices.showMessageWarning('El negocio no tiene un contacto agreado.')
    }

    const inputCreate = { tipoNegocio: "HOSP", nameRoute: this.dtoHospedaje.name_route }

    this.baseServices.showLoading();
    this.usuariosContactadosMastService.create(inputCreate).subscribe(
      response => {
        this.baseServices.hideLoading();

        const numero = this.dtoHospedaje.celular; // Reemplaza con el número real en formato internacional
        const mensaje = '“¡Hola! \n Encontré su hospedaje en la página Mis Pueblitos. \n\n Me gustaría saber la disponibilidad y los precios, por favor.';
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
