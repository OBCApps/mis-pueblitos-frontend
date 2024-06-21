import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, Component, signal } from '@angular/core';
import { ToursService } from '../../../../../../../services/tours.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutesCreated } from '../../../../view-pueblito.service';
import { DtoTourView } from '../../models/DtoTourView';
import { LoadingService } from '../../../../../../../functions/loadings/loading-service.service';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';
import { LowerCasePipe, NgClass, NgFor } from '@angular/common';

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

  reservarAhora() {
    // Check if the modal already exists to avoid creating multiple instances
    let modal = document.getElementById('googleCalendarModal');
    
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'googleCalendarModal'; // Unique ID for the modal
      modal.style.display = 'none'; // Initially hidden
      modal.style.position = 'fixed';
      modal.style.top = '0';
      modal.style.left = '0';
      modal.style.width = '100%';
      modal.style.height = '100%';
      modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
      modal.style.zIndex = '1000'; // Ensure it appears on top
  
      const modalContent = document.createElement('div');
      modalContent.style.position = 'relative';
      modalContent.style.margin = '10% auto';
      modalContent.style.padding = '20px';
      modalContent.style.backgroundColor = 'white';
      modalContent.style.width = '80%';
      modalContent.style.maxWidth = '600px';
      
      modalContent.innerHTML = `
        <link href="https://calendar.google.com/calendar/scheduling-button-script.css" rel="stylesheet">
        <script src="https://calendar.google.com/calendar/scheduling-button-script.js" async></script>
        <script>
          (function() {
            window.addEventListener('load', function() {
              calendar.schedulingButton.load({
                url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ39SoK7uLrHc0LgCZHY1BrMfS4-K4Ok5HuryGgwm6sAaY2PJJrsS6vg8RntEEQ7aPxj_MrFfEJp?gv=true',
                color: '#039BE5',
                label: 'Reservar una cita',
                target: document.getElementById('googleCalendarModal'),
              });
            });
          })();
        </script>
      `;
  
      // Append content to modal
      modal.appendChild(modalContent);
  
      // Append the modal to the body
      document.body.appendChild(modal);
  
      // Add a close button functionality
      const closeButton = document.createElement('button');
      closeButton.textContent = 'Cerrar';
      closeButton.style.position = 'absolute';
      closeButton.style.top = '10px';
      closeButton.style.right = '10px';
      closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
      });
      modalContent.appendChild(closeButton);
    }
  
    // Display the modal
    modal.style.display = 'block';
  }
  
}
