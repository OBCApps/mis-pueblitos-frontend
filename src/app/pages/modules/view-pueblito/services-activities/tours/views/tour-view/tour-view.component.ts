import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, Component, ElementRef, ViewChild, signal } from '@angular/core';
import { ToursService } from '../../../../../../../services/tours.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutesCreated } from '../../../../view-pueblito.service';
import { DtoTourView } from '../../models/DtoTourView';
import { LoadingService } from '../../../../../../../functions/loadings/loading-service.service';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';
import { LowerCasePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { BaseComponenst } from '../../../../../../../functions/base-components/BaseComponents';
import Swal from 'sweetalert2';
declare const calendar: any;
@Component({
  selector: 'app-tour-view',
  standalone: true,
  imports: [LowerCasePipe, NgClass, NgFor, NgIf],
  templateUrl: './tour-view.component.html',
  styleUrl: './tour-view.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TourViewComponent extends BaseComponenst {
  constructor(
    private readonly toursService: ToursService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly loading: LoadingService,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }
  routesCreated: RoutesCreated = new RoutesCreated()
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.routesCreated.agencia_name = params['agencia_name'];
      this.routesCreated.tour_name = params['tour_name'];
      this.loadTour(this.routesCreated.tour_name);
    });

    this.route.parent.params.subscribe(params => {
      this.routesCreated.departamento = params['departamento'];
      this.routesCreated.lugar = params['lugar'];
    });
  }



  tourView: DtoTourView = new DtoTourView();
  loadTour(tour_name: string) {
    this.loading.show();
    this.toursService.get_tour_by_name_route(tour_name).subscribe(
      (data: DtoTourView) => {
        this.tourView = data;
        this.cdr.detectChanges();
        this.initializeCarruselsSwipes();
        //this.createinfoPhotosCarrusel()
        //this.createinfoMoreBussinesCarrusel();


        this.reservarAhora('https://calendar.google.com/calendar/appointments/schedules/AcZssZ39SoK7uLrHc0LgCZHY1BrMfS4-K4Ok5HuryGgwm6sAaY2PJJrsS6vg8RntEEQ7aPxj_MrFfEJp?gv=true')
        this.loading.hide();
      }, err => {
        this.loading.hide();
      }
    );
  }

  gotoAgencia() {
    this.router.navigate(['home', this.routesCreated.departamento, this.routesCreated.lugar, 'tours-experiencias', this.routesCreated.agencia_name]);
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

    this.initializeSwiper('infoMoreBussines', {
      spaceBetween: 10,
      pagination: false,
      navigation: {
        enabled: true,
        nextEl: '.swiperinfoMoreBussines-button-next',
        prevEl: '.swiperinfoMoreBussines-button-prev'
      },
      breakpoints: {
        320: { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1280: { slidesPerView: 4 }
      }
    });
  }

  /* swiperElement = signal<SwiperContainer | null>(null);
  createinfoMoreBussinesCarrusel() {
    if (typeof document !== 'undefined') {
      const swiperElemConstructor = document.getElementById('infoMoreBussines');
      if (swiperElemConstructor) {
        const swiperOPtions: SwiperOptions = {
          spaceBetween: 10,
          pagination: false,

          breakpoints: {
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },

          }
        }
        Object.assign(swiperElemConstructor, swiperOPtions);
        this.swiperElement.set(swiperElemConstructor as SwiperContainer)
        this.swiperElement().initialize()
      }
    }
  } */
  /* swiperElement1 = signal<SwiperContainer | null>(null);
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
  } */
  // --------- IMPLEMENTACION DE LA RESERVA 
  @ViewChild('googleCalendarButton', { static: false }) googleCalendarButton!: ElementRef;


  initializeGoogleCalendar(url) {
    if (this.googleCalendarButton && this.googleCalendarButton.nativeElement) {
      calendar.schedulingButton.load({
        url: url,
        color: '#1AC816',
        label: 'Reservar',
        target: this.googleCalendarButton.nativeElement
      });
    }
  }

  reservarAhora(url: any) {
    this.initializeGoogleCalendar(url);
  }

  gotoNegocio(item: any) {
    if (item.tipo === 'REST') {
      this.router.navigate([
        'home',
        this.routesCreated.departamento,
        this.routesCreated.lugar,
        'restaurantes',
        item.name_route
      ]).then(() => {
        window.location.reload();
      });
    } else {
      this.router.navigate([
        'home',
        this.routesCreated.departamento,
        this.routesCreated.lugar,
        'tours-experiencias',
        item.agenciadesc,
        item.name_route
      ]).then(() => {
        window.location.reload();
      });
    }
  }

  getTitleExperience(): string {
    const message = 'Hola, quiero reservar la siguiente experiencia: ';
    const name = this.tourView?.nombre || 'Experiencia sin nombre';
    return message + name; // 🏔🍀
  }



  openReservationOptions(): void {
    Swal.fire({
      title: '¿Cómo desea reservar?',
      showCancelButton: true,
      confirmButtonText: 'Por la Web',
      cancelButtonText: 'Por WhatsApp',
      customClass: {
        title: 'text-xl',
        confirmButton: 'bg-green-500 text-sm text-white hover:bg-green-600 px-4 py-2 rounded',
        cancelButton: 'bg-green-500 text-sm text-white hover:bg-green-600 px-4 py-2 rounded'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.openGoogleCalendarModal();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.openWhatsAppLink();
      }
    });
  }

  openGoogleCalendarModal(): void {
    Swal.fire({
      html: '<iframe src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ39SoK7uLrHc0LgCZHY1BrMfS4-K4Ok5HuryGgwm6sAaY2PJJrsS6vg8RntEEQ7aPxj_MrFfEJp?gv=true" width="100%" height="500" frameborder="0"></iframe>',
      showCloseButton: true,
      showConfirmButton: false,
      padding: '0',
      customClass: {
        popup: 'w-full lg:w-[80%] '
      }
    });
  }

  openWhatsAppLink(): void {
    const titleExperience = this.getTitleExperience(); // Asegúrate de tener este método implementado
    const whatsappUrl = `https://wa.me/51900649509?text=${encodeURIComponent(titleExperience)}`;
    window.open(whatsappUrl, '_blank');
  }

}
