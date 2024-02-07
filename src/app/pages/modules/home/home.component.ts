import { NgClass } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Carousel, CarouselModule } from 'primeng/carousel';
import { NavarComponent } from '../../navar/navar.component';
import { FooterComponent } from '../../footer/footer.component';
import { Router, RouterLink } from '@angular/router';
import { HomeService } from '../../../services/home.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LugarService } from '../../../services/lugar.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule, CarouselModule, NavarComponent, FooterComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(
    private homeService: HomeService,
    private fb: FormBuilder,
    private router: Router,
    private lugarService: LugarService,
  ) {

  }
  searchValueForm: FormGroup = this.fb.group({
    departamentoId: [{ value: '', disabled: false }, Validators.required],
    lugarId: [{ value: '', disabled: false }],
  });

  responsiveOptions = [

    {
      breakpoint: '1536px',
      numVisible: 5,
      numScroll: 1
    },
    {
      breakpoint: '1280px',
      numVisible: 4,
      numScroll: 1
    },
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '640px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  ngOnInit() {
    this.load_list_departament()
    this.loadMoreSearch(this.searchValueForm.value)
  }

  goToRoute(item: any){
    this.lugarService.getLugares(item.id).subscribe(
      (response: any) => {
        localStorage.setItem('lugar', JSON.stringify(response));
        console.log('Lugar:', localStorage.getItem('lugar'));
        this.router.navigate(['/pueblitos']);
      },
      (err) => {
        console.log('Error:', err);
      }
    );

  }


  // ------------------  CALL SERVICES ------------------ \\
  list_department: any[] = []
  load_list_departament() {
    this.homeService.get_list_department().subscribe(
      response => {
        this.list_department = response;
      }, err => {

      }
    )
  }

  list_lugares: any[] = []
  load_list_lugar(idDepartamento: any) {
    this.homeService.get_list_lugar(idDepartamento).subscribe(
      response => {
        this.list_lugares = response;
        this.list_pueblitos_encontrados = response
      }, err => {

      }
    )
  }

  list_pueblitos_encontrados: any[] = []
  search_lugar(form: any) {
    this.list_pueblitos_encontrados = []
    this.homeService.search_listado_pueblitos(form).subscribe(
      (response: any) => {
        this.list_pueblitos_encontrados = response;
      },
      err => {
      }
    )
  }

  more_search: any[] = []
  loadMoreSearch(form) {
    this.more_search = []
    this.homeService.search_listado_pueblitos(form).subscribe(
      (response: any) => {
        this.more_search = response;
      },
      err => {
      }
    )
  }
}
