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
import { ModalRedesSocialesComponent } from '../../modal-redes-sociales/modal-redes-sociales.component';

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
    private loading: LoadingService
  ) {}
  searchValueForm: FormGroup = this.fb.group({
    departamentoId: [{ value: '', disabled: false }, Validators.required],
    lugarId: [{ value: '', disabled: false }],
  });

  modal_style="fixed w-full h-full inset-x-0 inset-y-0 global-center transition-all duration-1000 ease-in-out";

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
    this.load_list_departament();
    this.loadMoreSearch();
  }

  goToRoute(idLugar: any) {
    this.loading.show();
    this.lugarService.getLugares(idLugar).subscribe(
      (response: any) => {
        localStorage.setItem('lugar', JSON.stringify(response));
        this.loading.hide();
        this.router.navigate(['/pueblitos']);
      },
      (err) => {
        this.loading.hide();
        console.log('Error:', err);
      }
    );
  }

  close_modal() {
    this.modal_style="fixed w-full h-full inset-x-0 top-[-1000px] global-center transition-all duration-1000 ease-in-out";
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
      (err) => {}
    );
  }

  list_pueblitos_encontrados: any[] = [];
  search_lugar(form: any) {
    if (form.departamentoId && !form.lugarId) {
      this.goToDepartments(form);
    } else if (form.departamentoId && form.lugarId) {
      this.goToRoute(form.lugarId);
    } else {
      Swal.fire('Seleccione un departamento o lugar');
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
      (err) => {}
    );
  }

  goToDepartments(form: any) {
    const queryParamsObject = {
      departmentId: form.departamentoId,
    };
    this.router.navigate(['/department'], { queryParams: queryParamsObject });
  }
}
