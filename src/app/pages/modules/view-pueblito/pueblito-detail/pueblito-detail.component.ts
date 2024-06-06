import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { FooterComponent } from '../../../footer/footer.component';
import { CarouselModule } from 'primeng/carousel';
import { isPlatformBrowser } from '@angular/common';
import { RoutesCreated, TitleService } from '../view-pueblito.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalProveedorService } from '../../../../functions/modal-proveedor/modal-proveedor.service';
import { ModalProveedorComponent } from '../../../../functions/modal-proveedor/modal-proveedor.component';
import { FestivitiesService } from '../../../../services/festivities.service';
import moment from 'moment';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ServicesActivitiesServices } from '../services-activities/services-activities.service';

@Component({
  selector: 'app-pueblito-detail',
  standalone: true,
  imports: [CarouselModule, ModalProveedorComponent, RouterLink],
  templateUrl: './pueblito-detail.component.html',
  styleUrl: './pueblito-detail.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PueblitoDetailComponent implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private titleService: TitleService,
    private sanitizer: DomSanitizer,
    private modalProveedorFotos: ModalProveedorService,
    private festivitiesService: FestivitiesService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router : Router,
    private serviceServicios: ServicesActivitiesServices
  ) { }

  routesCreated : RoutesCreated = new RoutesCreated()

  ngOnInit() {
    this.loading = true;
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('lugar')) {
        this.lugarDetalle = JSON.parse(localStorage.getItem('lugar') || '{}');
        if (this.lugarDetalle.video) {
          this.urlSegura = this.sanitizer.bypassSecurityTrustResourceUrl(
            this.lugarDetalle.video.url
          );
        }
      }
    }

    this.route.params.subscribe((params) => {
      this.routesCreated.departamento = params['departamento'];
      this.routesCreated.lugar = params['lugar'];
      
    });

    this.loading = false;

    // Set value sidebar
    const dataNavar = {
      sidebar: 'location',
    };
    this.transferedDataToNavar(dataNavar);

    this.getDaysFromDate(this.mesElegido, this.anioElegido)
  }

  loading = false;
  lugarDetalle: any = {};
  urlSegura: any = this.sanitizer.bypassSecurityTrustResourceUrl("");
  transferedDataToNavar(value: any): void {
    this.titleService.setTitle(value);
  }


  responsiveOptions = [
    {
      breakpoint: '1536px',
      numVisible: 4,
      numScroll: 1,
    },
    {
      breakpoint: '1280px',
      numVisible: 4,
      numScroll: 1,
    },
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '640px',
      numVisible: 1,
      numScroll: 1,
    },
  ];


  // ---------- VER LOS DATOS DEL PROVEEDOR ------------- \\4
  viewProveedorImage(item) {
    var data = {
      option: 'open',
      valueInput: item
    }
    console.log("data: ", data);

    this.modalProveedorFotos.activateModal(data);
  }


  // --------- LOAD FESTIVIDADES ---------- \\
  anioElegido: any = new Date().getFullYear();
  mesElegido: any = new Date().getMonth() + 1;
  actualDay: any = new Date().getDate();
  dateSelect: any;
  monthSelect: any[] = [];
  getDaysFromDate(month: any, year: any) {
    //this.loading.show();
    //this.monthSelect = []
    const data = {
      mes: month.toString(),
      anio: year.toString(),
      lugar: this.lugarDetalle.id
    };
    this.festivitiesService.search_events_dia(data).subscribe(
      (response: any) => {
        //this.functAgendaMes(response, month_selected)
        const startDate = moment(`${year}-${month}-01`, 'YYYY-MM-DD');
        const endDate = startDate.clone().endOf('month');

        const diffDays = endDate.diff(startDate, 'days', true);
        const numberDays = Math.round(diffDays);

        const arrayDays = Object.keys([...Array(numberDays)]).map((a: any) => {
          a = parseInt(a) + 1;
          const dayObject = moment(`${year}-${month}-${a}`, 'YYYY-MM-DD');
          return {
            name: dayObject.format('dddd'),
            value: a,
            indexWeek: dayObject.isoWeekday(),
            fecha: dayObject.format(),
            class: 'bg-blue-400',
            events: [],
          };
        });
        this.dateSelect = startDate;
        //this.monthSelect = arrayDays;
        this.functAgendaMes(response, arrayDays);
      },
      (err) => { }
    );
  }
  functAgendaMes(days: any, month_selected: any) {
    const data = days;
    const result: any[] = [];

    month_selected.forEach((item1) => {
      const item2 = data.find((item2: any) => {
        let p1 = moment.utc(item2.fecha);
        let p2 = moment.utc(item1.fecha);
        return p1.isSame(p2, 'day');
      });

      if (item2) {
        // ENCONTRADO
        result.push({
          events: item2.events,
          class: 'A',
          name: item1.name,
          value: item1.value,
          indexWeek: item1.indexWeek,
          fecha: item1.fecha,
        });
      } else {
        // NO ENCONTRADO
        result.push({
          events: [],
          class: '----',
          name: item1.name,
          value: item1.value,
          indexWeek: item1.indexWeek,
          fecha: item1.fecha,
        });
      }
    });

    this.monthSelect = result;
    //this.loading.hide();
    console.log('FINAL: ', this.monthSelect);
    this.cdr.detectChanges();
    this.createFestivitiesCarrusel()
  }

  swiperMenuElement = signal<SwiperContainer | null>(null);
  createFestivitiesCarrusel() {
    if (typeof document !== 'undefined') {
      const swiperElemConstructor = document.getElementById('Festivities');
      if (swiperElemConstructor) {
        const swiperOPtions: SwiperOptions = {
          spaceBetween: 15,
          pagination: false,
          navigation: {
            enabled: true,
            nextEl: '.swiper-buttonFestivities-next',
            prevEl: '.swiper-buttonFestivities-prev'
          },
          breakpoints: {
            320: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },

          }
        }
        Object.assign(swiperElemConstructor, swiperOPtions);
        this.swiperMenuElement.set(swiperElemConstructor as SwiperContainer)
        this.swiperMenuElement().initialize()
      }
    }
  }

  onlyEventes(EventsMonts: any): any[] {
    let events: any[] = []
    if (Array.isArray(EventsMonts)) {
      EventsMonts.forEach(item => {
        if (item.events.length != 0) {
          item.events.forEach(event => {
            events.push(event)
          })
        }
      })
    }
    return events;
  }

  goToRoute(routeCreated : RoutesCreated) {  
    if (routeCreated.action == 'location') {
      this.router.navigate(['home', routeCreated.departamento, routeCreated.lugar])
    } else {
      this.router.navigate(['home', routeCreated.departamento, routeCreated.lugar, routeCreated.action])
    }
  }
  cambiarTipoServicio(tipo: string): void {
    this.serviceServicios.setTipoServicio(tipo);
  }
}
