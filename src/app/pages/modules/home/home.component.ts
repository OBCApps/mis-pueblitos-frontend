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


  list_logros: any[] = [
        {
            id: 3,
            title: "Representamos a la UP en el EMI Mark Mobius Pitch Competition 2024",
            description:
                "Representamos a la Universidad del Pacífico y al Perú en el EMI Mark Mobius Pitch Competition 2024. Nuestro equipo 'Mis Pueblitos' fue seleccionado para participar junto a startups de todo el mundo.",
            date: "Octubre 2024",
            organization: "Universidad del Pacífico",
            category: "competition",
            image: "data:image/jpeg;base64,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", // reemplazar por imagen real si tienes
        },
        {
            id: 4,
            title: "Reconocimiento como Runners-Up en el EMI 2024",
            description:
                "Fuimos reconocidos como 'Runner-Up' en el EMI Mark Mobius Pitch Competition 2024, destacando el impacto y la pasión de nuestro proyecto 'Mis Pueblitos'.",
            date: "Octubre 2024",
            organization: "Cornell University - EE.UU",
            category: "award",
            position: "6° Lugar",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx_sJk9hV7gZDGqSN_MU-ZlpcShEjdNSvdXg&s", // reemplazar por imagen real si tienes
            link: "https://business.cornell.edu/centers/emi/conference/pitch-competition/"
        }
    ];


    trackByAchievement(index: number, achievement: any): number {
        return achievement.id
    }

    getCategoryColor(category: string): string {
        const colors = {
            competition: "bg-yellow-100 text-yellow-600",
            award: "bg-purple-100 text-purple-600",
            milestone: "bg-blue-100 text-blue-600",
            recognition: "bg-green-100 text-green-600",
        }
        return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-600"
    }



    getCategoryLabel(category: string): string {
        const labels = {
            competition: "Competencia",
            award: "Premio",
            milestone: "Hito",
            recognition: "Reconocimiento",
        }
        return labels[category as keyof typeof labels] || "Logro"
    }

    openLink(url: string): void {
        window.open(url, "_blank");
    }

}
