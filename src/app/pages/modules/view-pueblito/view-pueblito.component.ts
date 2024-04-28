import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID, Renderer2, signal } from '@angular/core';
import { NavarComponent } from '../../navar/navar.component';
import { CommonModule, NgClass, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../footer/footer.component';
import { LugarService } from '../../../services/lugar.service';
import { TitleService } from './view-pueblito.service';
import { BreadCrumbComponent } from './bread-crumb/bread-crumb.component';
import { ModalProveedorComponent } from '../../../functions/modal-proveedor/modal-proveedor.component';
import { ModalProveedorService } from '../../../functions/modal-proveedor/modal-proveedor.service';
import { ModalRedesSocialesComponent } from '../../../functions/modal-redes-sociales/modal-redes-sociales.component';
import { stringify } from 'querystring';
import { LoadingService } from '../../../functions/loadings/loading-service.service';
import { SwiperOptions } from 'swiper/types';
import { SwiperContainer } from 'swiper/element';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-view-pueblito',
  standalone: true,
  imports: [
    NavarComponent,
    CommonModule,
    RouterOutlet,
    RouterLink,
    FooterComponent,
    NgClass,
    BreadCrumbComponent,
    ModalProveedorComponent,
    ModalRedesSocialesComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './view-pueblito.component.html',
  styleUrl: './view-pueblito.component.scss',
})
export class ViewPueblitoComponent implements OnInit {
  sideSelected: any = 'relative flex items-center space-x-4 border-b border-black from-sky-600 to-cyan-400 px-4 py-3 text-black'
  sideNotSelected: any = 'bg group flex items-center space-x-4 rounded-full px-4 py-3 text-gray-600 cursor-pointer'

  textSelected: any = '-mr-1 font-medium';
  textNotSelected: any = 'group-hover:text-gray-700 cursor-pointer';
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private lugarService: LugarService,
    private route: ActivatedRoute,
    private titleService: TitleService,
    private modalProveedorFotos: ModalProveedorService,
    private router: Router,
    private loading: LoadingService,
    private el: ElementRef, 
    private renderer: Renderer2
  ) { }
  title: any = '';
  list_navar_option = [
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>',
      name: 'Chacas',
      routerLink: 'location'
    },
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 49 48" stroke-width="1.5" stroke="currentColor" fill="none"><path d="M36.5003 16.62C35.7803 15.8 35.0403 14.98 34.2603 14.2L33.6803 13.66L33.9603 13.42C34.9384 12.5804 35.6354 11.461 35.9573 10.2129C36.2791 8.96471 36.2104 7.64786 35.7603 6.43999C35.1081 5.07793 34.0755 3.93385 32.7872 3.14595C31.4989 2.35805 30.01 1.96004 28.5003 1.99999V5.99999C29.2119 5.99009 29.9133 6.17021 30.532 6.52178C31.1508 6.87335 31.6646 7.38363 32.0203 7.99999C32.3603 8.79999 32.0203 9.67999 31.0803 10.62C30.9403 10.78 30.7803 10.88 30.6403 11.02C24.6403 6.19999 18.0603 3.47999 14.8403 6.69999C14.503 7.04479 14.2259 7.44364 14.0203 7.87999V8.07999L13.6603 9.13999L4.84033 35.34C4.50671 36.3273 4.41312 37.3799 4.56732 38.4106C4.72152 39.4413 5.11906 40.4204 5.72702 41.2669C6.33498 42.1133 7.13587 42.8028 8.06334 43.278C8.99081 43.7533 10.0182 44.0008 11.0603 44C11.7408 43.9934 12.4159 43.8786 13.0603 43.66L40.5003 34.56C40.8375 34.4345 41.1347 34.2203 41.3603 33.94L41.7803 33.58C44.6403 30.7 42.8003 25.16 38.9603 19.78C41.2404 18.4493 43.8658 17.8295 46.5003 18V14C42.975 13.806 39.4776 14.7223 36.5003 16.62ZM11.9003 39.86C11.4463 40.0103 10.9595 40.0314 10.4942 39.921C10.0289 39.8107 9.60347 39.5731 9.26532 39.235C8.92718 38.8969 8.68967 38.4714 8.57931 38.0061C8.46894 37.5408 8.49007 37.054 8.64033 36.6L11.3603 28.4C13.3015 32.1018 16.2842 35.1541 19.9403 37.18L11.9003 39.86ZM25.9003 35.2C22.8778 34.3995 20.1205 32.8144 17.9078 30.6052C15.6951 28.396 14.1056 25.6413 13.3003 22.62L15.3003 16.62L15.4203 16.8C15.6403 17.24 15.9203 17.7 16.2003 18.16C16.4803 18.62 16.5203 18.74 16.7203 19.04C16.9203 19.34 17.3803 20 17.7403 20.5C18.1003 21 18.1203 21.06 18.3403 21.34C18.5603 21.62 19.2003 22.44 19.6603 22.98L20.2403 23.68C20.9203 24.46 21.6403 25.22 22.4003 26C23.1603 26.78 23.7603 27.28 24.4003 28L25.0603 28.56L26.6203 29.82L27.3603 30.38C27.9203 30.78 28.4603 31.18 29.0203 31.54L29.6403 31.94C30.3603 32.38 31.0803 32.8 31.7803 33.16H31.8803L25.9003 35.2ZM38.9203 30.74H38.8003C37.4203 31.5 31.6803 29.6 25.2203 23.12C24.5403 22.44 23.9003 21.78 23.3203 21.12L22.7403 20.42L21.6803 19.14L21.1003 18.34C20.8403 17.96 20.5603 17.6 20.3203 17.24L19.8003 16.4L19.2203 15.46C19.0603 15.18 18.9403 14.92 18.8003 14.66C18.6603 14.4 18.5003 14.14 18.3803 13.86C18.2731 13.6256 18.1796 13.3852 18.1003 13.14C18.0003 12.88 17.8803 12.62 17.8003 12.38C17.7203 12.14 17.7003 12 17.6403 11.76C17.5803 11.52 17.5403 11.32 17.5003 11.12C17.4904 10.9468 17.4904 10.7732 17.5003 10.6C17.4811 10.4406 17.4811 10.2794 17.5003 10.12L17.7203 9.49999C18.4403 8.77999 22.1803 9.49999 27.1803 13.3C26.3328 13.6825 25.4267 13.9192 24.5003 14V18C26.6248 17.8778 28.686 17.2319 30.5003 16.12L31.4603 17.04C32.3003 17.88 33.0803 18.74 33.8203 19.6C32.6755 21.6702 32.2533 24.063 32.6203 26.4L36.6203 25.62C36.5025 24.878 36.5025 24.122 36.6203 23.38C37.2307 24.3056 37.7722 25.2749 38.2403 26.28C39.3603 28.92 39.2803 30.4 38.9203 30.74Z" fill="#29252C"/></svg>',
      name: 'Festividades',
      routerLink: 'festividades'
    },
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 49 48" stroke-width="1.5" stroke="currentColor" fill="none"><path d="M46.5 4V38H31.328L24.5 44.828L17.672 38H2.5V4H46.5ZM42.5 8H6.5V34H19.328L24.5 39.172L29.672 34H42.5V8Z" fill="#29252C"/></svg>',
      name: 'Tips Viajeros',
      routerLink: 'tips-viajero'
    },
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 49 48" stroke-width="1.5" stroke="currentColor" fill="none"><path d="M36.5003 16.62C35.7803 15.8 35.0403 14.98 34.2603 14.2L33.6803 13.66L33.9603 13.42C34.9384 12.5804 35.6354 11.461 35.9573 10.2129C36.2791 8.96471 36.2104 7.64786 35.7603 6.43999C35.1081 5.07793 34.0755 3.93385 32.7872 3.14595C31.4989 2.35805 30.01 1.96004 28.5003 1.99999V5.99999C29.2119 5.99009 29.9133 6.17021 30.532 6.52178C31.1508 6.87335 31.6646 7.38363 32.0203 7.99999C32.3603 8.79999 32.0203 9.67999 31.0803 10.62C30.9403 10.78 30.7803 10.88 30.6403 11.02C24.6403 6.19999 18.0603 3.47999 14.8403 6.69999C14.503 7.04479 14.2259 7.44364 14.0203 7.87999V8.07999L13.6603 9.13999L4.84033 35.34C4.50671 36.3273 4.41312 37.3799 4.56732 38.4106C4.72152 39.4413 5.11906 40.4204 5.72702 41.2669C6.33498 42.1133 7.13587 42.8028 8.06334 43.278C8.99081 43.7533 10.0182 44.0008 11.0603 44C11.7408 43.9934 12.4159 43.8786 13.0603 43.66L40.5003 34.56C40.8375 34.4345 41.1347 34.2203 41.3603 33.94L41.7803 33.58C44.6403 30.7 42.8003 25.16 38.9603 19.78C41.2404 18.4493 43.8658 17.8295 46.5003 18V14C42.975 13.806 39.4776 14.7223 36.5003 16.62ZM11.9003 39.86C11.4463 40.0103 10.9595 40.0314 10.4942 39.921C10.0289 39.8107 9.60347 39.5731 9.26532 39.235C8.92718 38.8969 8.68967 38.4714 8.57931 38.0061C8.46894 37.5408 8.49007 37.054 8.64033 36.6L11.3603 28.4C13.3015 32.1018 16.2842 35.1541 19.9403 37.18L11.9003 39.86ZM25.9003 35.2C22.8778 34.3995 20.1205 32.8144 17.9078 30.6052C15.6951 28.396 14.1056 25.6413 13.3003 22.62L15.3003 16.62L15.4203 16.8C15.6403 17.24 15.9203 17.7 16.2003 18.16C16.4803 18.62 16.5203 18.74 16.7203 19.04C16.9203 19.34 17.3803 20 17.7403 20.5C18.1003 21 18.1203 21.06 18.3403 21.34C18.5603 21.62 19.2003 22.44 19.6603 22.98L20.2403 23.68C20.9203 24.46 21.6403 25.22 22.4003 26C23.1603 26.78 23.7603 27.28 24.4003 28L25.0603 28.56L26.6203 29.82L27.3603 30.38C27.9203 30.78 28.4603 31.18 29.0203 31.54L29.6403 31.94C30.3603 32.38 31.0803 32.8 31.7803 33.16H31.8803L25.9003 35.2ZM38.9203 30.74H38.8003C37.4203 31.5 31.6803 29.6 25.2203 23.12C24.5403 22.44 23.9003 21.78 23.3203 21.12L22.7403 20.42L21.6803 19.14L21.1003 18.34C20.8403 17.96 20.5603 17.6 20.3203 17.24L19.8003 16.4L19.2203 15.46C19.0603 15.18 18.9403 14.92 18.8003 14.66C18.6603 14.4 18.5003 14.14 18.3803 13.86C18.2731 13.6256 18.1796 13.3852 18.1003 13.14C18.0003 12.88 17.8803 12.62 17.8003 12.38C17.7203 12.14 17.7003 12 17.6403 11.76C17.5803 11.52 17.5403 11.32 17.5003 11.12C17.4904 10.9468 17.4904 10.7732 17.5003 10.6C17.4811 10.4406 17.4811 10.2794 17.5003 10.12L17.7203 9.49999C18.4403 8.77999 22.1803 9.49999 27.1803 13.3C26.3328 13.6825 25.4267 13.9192 24.5003 14V18C26.6248 17.8778 28.686 17.2319 30.5003 16.12L31.4603 17.04C32.3003 17.88 33.0803 18.74 33.8203 19.6C32.6755 21.6702 32.2533 24.063 32.6203 26.4L36.6203 25.62C36.5025 24.878 36.5025 24.122 36.6203 23.38C37.2307 24.3056 37.7722 25.2749 38.2403 26.28C39.3603 28.92 39.2803 30.4 38.9203 30.74Z" fill="#29252C"/></svg>',
      name: 'Lugares Turísticos',
      routerLink: 'lugares-turisticos'
    },
    {
      icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" stroke-width="1.5" stroke="currentColor" viewBox="0 0 49 48" fill="none"><path d="M14.5 28C17.82 28 20.5 25.32 20.5 22C20.5 18.68 17.82 16 14.5 16C11.18 16 8.5 18.68 8.5 22C8.5 25.32 11.18 28 14.5 28ZM14.5 20C15.6 20 16.5 20.9 16.5 22C16.5 23.1 15.6 24 14.5 24C13.4 24 12.5 23.1 12.5 22C12.5 20.9 13.4 20 14.5 20ZM38.5 14H22.5V30H6.5V10H2.5V40H6.5V34H42.5V40H46.5V22C46.5 17.58 42.92 14 38.5 14ZM42.5 30H26.5V18H38.5C40.7 18 42.5 19.8 42.5 22V30Z" /></svg>',
      name: 'Servicios',
      routerLink: 'servicios'
    },
  ]
  getSafeIcon(icon: string) {
    //return this.sanitizer.bypassSecurityTrustHtml(icon);
    return icon
  }
  ngOnInit() {
    this.route.params.subscribe((params) => {
      const departamento = params['departamento'];
      const lugar = params['lugar'];
      this.loadLugarDetalles(lugar)
    });

    this.titleService.title$.subscribe((newTitle: any) => {
      setTimeout(() => {
        this.updateTitle(newTitle.sidebar);
      });
    });

    this.createCarrusel()
  }

  navbarStatic : boolean = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const menu = document.getElementById('navar-static');
    this.navbarStatic = window.pageYOffset >= menu.offsetTop;    
    
  }


  finalRpta: any;
  loadLugarDetalles(lugar: any) {
    this.loading.show();
    this.lugarService.getLugarByNameRoute(lugar).subscribe(
      rpta => {
        this.lugarDetalle = rpta;
        // TRAER TODOS LOS DATOS DEL LUGAR
        this.lugarService.getLugares(rpta.id).subscribe(
          rpta => {
            if (isPlatformBrowser(this.platformId)) {
              rpta['diaCalendario'] = {
                anioElegido: new Date().getFullYear(),
                mesElegido: new Date().getMonth() + 1
              }
              localStorage.setItem('lugar', JSON.stringify(rpta))
              this.finalRpta = rpta
            }
            this.loading.hide();
          }, error => {
            this.loading.hide();
          }
        );


      },
      (error) => {
        console.log("erro");
        this.loading.hide();
      }
    )

  }

  // -------- TITLE SELECTED NAVAR ----------- \\
  lugarDetalle: any = {};
  private updateTitle(newTitle: any) {
    this.title = newTitle;
    

  }


  // --------- OPTIONS MOBILE ------------- \\
  active: boolean = false;
  clickActiveModal(change: any) {
    this.active = change;
  }
  viewProveedorImage(item) {
    var data = {
      option: 'open',
      valueInput: item
    }
    this.modalProveedorFotos.activateModal(data);
  }

  // ------ GO TO ROUTE SELECTED ----------- \\
  goToRoute(departament: any, lugar: any, action: any) {
    console.log("Gooos");

    if (action == 'location') {
      this.router.navigate(['home', departament, lugar])
    } else {
      this.router.navigate(['home', departament, lugar, action])
    }

  }

  goToInit(departament: any, lugar: any) {
    this.router.navigate(['home', departament, lugar])
  }


  // ------------- CARUSEL MODULE ------------ \\
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
            320: { slidesPerView: 3 },
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },

          }
        }
        Object.assign(swiperElemConstructor, swiperOPtions);
        this.swiperElement.set(swiperElemConstructor as SwiperContainer)
        this.swiperElement()?.initialize()
      }
    }
  }

}
