import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, Component, ElementRef, ViewChild, signal } from '@angular/core';
import { ToursService } from '../../../../../../../services/tours.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutesCreated } from '../../../../view-pueblito.service';
import { DtoTourView } from '../../models/DtoTourView';
import { LoadingService } from '../../../../../../../functions/loadings/loading-service.service';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';
import { LowerCasePipe, NgClass, NgFor } from '@angular/common';
declare const calendar: any;
@Component({
  selector: 'app-tour-view',
  standalone: true,
  imports: [LowerCasePipe, NgClass, NgFor],
  templateUrl: './tour-view.component.html',
  styleUrl: './tour-view.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TourViewComponent {
  constructor(
    private readonly toursService: ToursService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly loading: LoadingService,
    private cdr: ChangeDetectorRef
  ) { }
  routesCreated: RoutesCreated = new RoutesCreated()
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.routesCreated.agencia_name = params['agencia_name'];
      this.routesCreated.tour_name = params['tour_name'];

      this.loadTour(this.routesCreated.tour_name);
    });
  }
  // --------- IMPLEMENTACION DE LA RESERVA 
  @ViewChild('googleCalendarButton', { static: false }) googleCalendarButton!: ElementRef;
  ngAfterViewInit(): void {
    this.loadGoogleCalendarScript();
  }
  loadGoogleCalendarScript() {
    if (typeof calendar !== 'undefined' && calendar.schedulingButton) {
      this.initializeGoogleCalendar();
    } else {
      const script = document.createElement('script');
      script.src = 'https://calendar.google.com/calendar/scheduling-button-script.js';
      script.onload = () => this.initializeGoogleCalendar();
      document.head.appendChild(script);
    }
  }

  initializeGoogleCalendar() {
    if (this.googleCalendarButton && this.googleCalendarButton.nativeElement) {
      calendar.schedulingButton.load({
        url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ39SoK7uLrHc0LgCZHY1BrMfS4-K4Ok5HuryGgwm6sAaY2PJJrsS6vg8RntEEQ7aPxj_MrFfEJp?gv=true',
        color: '#039BE5',
        label: 'Reservar una cita',
        target: this.googleCalendarButton.nativeElement
      });
    }
  }

  reservarAhora() {
    // Llama a la función para abrir el modal de Google Calendar
    this.initializeGoogleCalendar();
  }
  tourView: DtoTourView = new DtoTourView();
  loadTour(tour_name: string) {
    this.loading.show();
    this.toursService.get_tour_by_name_route(tour_name).subscribe(
      (data: DtoTourView) => {
        this.tourView = data;
        this.cdr.detectChanges();
        this.createinfoPhotosCarrusel()
        this.createinfoMoreBussinesCarrusel();

        this.loading.hide();
      }, err => {
        this.loading.hide();
      }
    );
  }

  gotoAgencia() {
    this.router.navigate(['home', 'Ancash', 'Chacas', 'servicios', 'tour', this.routesCreated.agencia_name]);
  }

  swiperElement = signal<SwiperContainer | null>(null);
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


}
