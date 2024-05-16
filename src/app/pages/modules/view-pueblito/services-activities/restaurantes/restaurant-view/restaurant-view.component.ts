import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, Component, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResturanteService } from '../../../../../../services/restaurante.service';
import { DtoRestaurante } from '../entities/DtoRestaurante';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';

@Component({
  selector: 'app-restaurant-view',
  standalone: true,
  imports: [],
  templateUrl: './restaurant-view.component.html',
  styleUrl: './restaurant-view.component.scss',
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class RestaurantViewComponent {
  constructor(
    private restauranteService: ResturanteService,
    private router: Router,
    private readonly route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.load_restaurante(params['restaurante_name']);
    });
  }
  restaurante: DtoRestaurante;
  load_restaurante(name_route){
    this.restauranteService.get_restaurante_by_name_route(name_route).subscribe(
      (data:any) => {
        this.restaurante = data;
        
        this.cdr.detectChanges();        
        this.createCarrusel();
        this.createMenuCarrusel()
      }, err => {
        console.error(err);
      }
    );
  }

  get_Keys(data:any){
    console.log(Object.keys(data));
    return Object.keys(data);
  }
  swiperElement = signal<SwiperContainer | null>(null);
  createCarrusel() {
    if (typeof document !== 'undefined') {
      const swiperElemConstructor = document.getElementById('perfilPhotos');
      if (swiperElemConstructor) {
        const swiperOPtions: SwiperOptions = {
        
          pagination: false,
          navigation: {
            enabled: true,
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          breakpoints: {
            320: { slidesPerView: 1 },
            640: { slidesPerView: 1 },
            1024: { slidesPerView: 1 },
            1280: { slidesPerView: 1 },

          }
        }
        Object.assign(swiperElemConstructor, swiperOPtions);
        this.swiperElement.set(swiperElemConstructor as SwiperContainer)
        this.swiperElement().initialize()
      }
    }
  }

  swiperMenuElement = signal<SwiperContainer | null>(null);
  createMenuCarrusel() {
    if (typeof document !== 'undefined') {
      const swiperElemConstructor = document.getElementById('menuDates');
      if (swiperElemConstructor) {
        const swiperOPtions: SwiperOptions = {
          spaceBetween: 15,
          pagination: false,
          navigation: {
            enabled: true,
            nextEl: '.swiper-buttonMenu-next',
            prevEl: '.swiper-buttonMenu-prev'
          },
          breakpoints: {
            320: { slidesPerView: 1 },
            640: { slidesPerView: 1 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },

          }
        }
        Object.assign(swiperElemConstructor, swiperOPtions);
        this.swiperMenuElement.set(swiperElemConstructor as SwiperContainer)
        this.swiperMenuElement().initialize()
      }
    }
  }
}
