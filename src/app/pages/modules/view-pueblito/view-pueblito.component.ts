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
      const swiperElemConstructor = document.getElementById('navarOptions');
      if (swiperElemConstructor) {
        const swiperOPtions: SwiperOptions = {
          
          pagination: false,
          //centeredSlides: true,
          navigation: {
            enabled: true,
            nextEl: '.swiper-navarbutton-next',
            prevEl: '.swiper-navarbutton-prev'
          },
          breakpoints: {
            320: { slidesPerView: 3 },//3
            640: { slidesPerView: 3 },//3
            1024: { slidesPerView: 4 },//4
            1280: { slidesPerView: 4 },//5

          }
        }
        Object.assign(swiperElemConstructor, swiperOPtions);
        this.swiperElement.set(swiperElemConstructor as SwiperContainer)
        this.swiperElement().initialize()
      }
    }
  }

}
