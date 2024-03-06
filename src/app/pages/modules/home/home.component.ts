import { NgClass } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
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
import { LoadingService } from '../../../functions/loadings/loading-service.service';
import { ModalRedesSocialesComponent } from '../../../functions/modal-redes-sociales/modal-redes-sociales.component';
import { ModalRedesSocialesService } from '../../../functions/modal-redes-sociales/modal-redes-sociales.service';

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

  modal_style = "fixed w-full h-full inset-x-0 inset-y-0 global-center transition-all duration-1000 ease-in-out";

  responsiveOptions = [
    {
      breakpoint: '1536px',
      numVisible: 5,
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

  ngOnInit() {
    this.viewBannerModal()
    this.load_list_departament();
    this.loadMoreSearch();
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

  close_modal() {
    this.modal_style = "fixed w-full h-full inset-x-0 -top-full global-center transition-all duration-1000 ease-in-out";
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
      this.goToRoute(form.lugarId);
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
