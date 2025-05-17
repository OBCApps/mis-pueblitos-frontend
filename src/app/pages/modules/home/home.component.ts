import { NgClass } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, ViewChild, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Carousel, CarouselModule } from 'primeng/carousel';
import { NavarComponent } from '../../navar/navar.component';
import { FooterComponent } from '../../footer/footer.component';
import { Router, RouterLink } from '@angular/router';
import { HomeService } from '../../../services/home.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LugarService } from '../../../services/lugar.service';
import Swal from 'sweetalert2';
import { ModalRedesSocialesComponent } from '../../../functions/modal-redes-sociales/modal-redes-sociales.component';
import { ModalRedesSocialesService } from '../../../functions/modal-redes-sociales/modal-redes-sociales.service';
import Swiper from 'swiper';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';
import { LoadingService } from '../../../shared/global-components/loadings/loading-service.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgClass,
    ReactiveFormsModule,
    CarouselModule,
    NavarComponent,
    FooterComponent,
    RouterLink,
    ModalRedesSocialesComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(
    private homeService: HomeService,
    private fb: FormBuilder,
    private router: Router,
    private lugarService: LugarService,
    private loading: LoadingService,
    private modalRedesSociales: ModalRedesSocialesService
  ) { }

  searchValueForm: FormGroup = this.fb.group({
    departamentoId: [{ value: '', disabled: false }, Validators.required],
    lugarId: [{ value: '', disabled: false }],
  });

  ngOnInit() {

    this.viewBannerModal()
    this.load_list_departament();
    this.loadMoreSearch();
  }
  ngAfterViewInit() {

  }


  // ------------- CARUSEL MODULE ------------ \\
  swiperElement = signal<SwiperContainer | null>(null);
  createCarrusel() {
    if (typeof document !== 'undefined') {
      const swiperElemConstructor = document.querySelector('swiper-container');
      if (swiperElemConstructor) {
        const swiperOPtions: SwiperOptions = {
          slidesPerView: 3,
          pagination: false,
          centeredSlides: true,
          navigation: {
            enabled: true,
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          breakpoints: {
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }
        }
        Object.assign(swiperElemConstructor, swiperOPtions);
        this.swiperElement.set(swiperElemConstructor as SwiperContainer)
        this.swiperElement()?.initialize()
      }
    }
  }


  goToRoute(lugar: any) {
    this.loading.show();
    this.lugarService.getLugares(lugar.id).subscribe(
      (response: any) => {
        this.router.navigate(['home', response.departamentoNombreRuta, response.name_route]);
        this.loading.hide();

      },
      (err) => {
        this.loading.hide();
        console.log('Error:', err);
      }
    );
  }



  // ------------------  CALL SERVICES ------------------ \\
  list_department: any[] = [];
  load_list_departament() {
    this.loading.show();
    this.homeService.get_list_department().subscribe(
      (response) => {
        this.loading.hide();
        this.list_department = response;
      },
      (err) => {
        this.loading.hide();
      }
    );
  }

  list_lugares: any[] = [];
  load_list_lugar(idDepartamento: any) {
    this.homeService.get_list_lugar(idDepartamento).subscribe(
      (response) => {
        this.list_lugares = response;
        //this.list_pueblitos_encontrados = response
        /* if (response.length == 0) {
          Swal.fire("No se encontró!");
        } */
      },
      (err) => { }
    );
  }

  list_pueblitos_encontrados: any[] = [];
  search_lugar(form: any) {
    if (form.departamentoId && !form.lugarId) {
      console.log("form: ", form);

      this.goToDepartments(form);
    } else if (form.departamentoId && form.lugarId) {
      const lugar = {
        id: form.lugarId
      }
      this.goToRoute(lugar);
    } else {
      Swal.fire({
        title: 'Falta información',
        text: 'Por favor, selecciona un departamento o lugar antes de continuar. ¡Gracias! 😊',
        customClass: {
          confirmButton: 'text-red-500 border-2 border-red-500 bg-white',
          popup: 'border-1 border-solid border-red-500 ',
          title: 'text-red-500',
        },
        background: 'white',
        confirmButtonColor: 'red',
      });

    }
  }

  more_search: any[] = [];
  loadMoreSearch() {
    this.more_search = [];
    this.homeService.get_pueblitos_destacados().subscribe(
      (response: any[]) => {
        console.log('RESPONSE: ', response);

        this.more_search = response;
        this.createCarrusel()
      },
      (err) => { }
    );
  }


  goToDepartments(form: any) {
    console.log("departamento: ", form);
    /* const queryParamsObject = {
      departmentId: form.departamentoId,
      departmentName: 
    }; */
    const departmentName = this.list_department.find(
      (x) => x.id == form.departamentoId
    ).name_route
    this.router.navigate(['/home', departmentName]);

  }

  // --------------- OPEN MODAL ---------------- \\

  viewBannerModal() {
    var data = {
      option: 'open',
      valueInput: {}
    }
    this.modalRedesSociales.activateModal(data);
  }

}
