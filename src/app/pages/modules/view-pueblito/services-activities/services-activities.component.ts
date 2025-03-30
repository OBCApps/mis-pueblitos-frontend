import { Component, OnInit } from '@angular/core';
import { TitleService } from '../view-pueblito.service';
import { ModalFiltrosService } from './modal-filtros/modal-filtros.service';
import { ModalFiltrosComponent } from './modal-filtros/modal-filtros.component';
import { FormsModule } from '@angular/forms';
import { HotelesService } from '../../../../services/hoteles.service';
import { DtoHoteles } from './hospedajes/entities/DtoHoteles';
import { Router, RouterLink } from '@angular/router';
import {
  FiltroGeneralServicios,
  FiltroHabitaciones,
  FiltroRestaurantes,
  FiltroTours,
} from './entities/filtroGeneralServicios';
import { HabitacionService } from '../../../../services/habitacion.service';
import { ToursService } from '../../../../services/tours.service';
import { ResturanteService } from '../../../../services/restaurante.service';
import { LoadingService } from '../../../../functions/loadings/loading-service.service';
import { AtractivoTuristicoService } from '../../../../services/atractivos-turisticos.service';
import { Dropdown, DropdownInterface, DropdownOptions, InstanceOptions } from 'flowbite';
import { ServicesActivitiesServices } from './services-activities.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-services-activities',
  standalone: true,
  imports: [ModalFiltrosComponent, FormsModule, NgIf],
  templateUrl: './services-activities.component.html',
  styleUrl: './services-activities.component.scss',
})
export class ServicesActivitiesComponent implements OnInit {
  constructor(
    private titleService: TitleService,
    private modalService: ModalFiltrosService,
    private habitacionService: HabitacionService,
    private toursService: ToursService,
    private restauranteService: ResturanteService,
    private router: Router,
    private loading: LoadingService,
    private serviceServicios: ServicesActivitiesServices
  ) { }

  ngOnInit() {
    // --------- Change title
    const dataNavar = {
      sidebar: 'servicios',
    };
    this.transferedDataToNavar(dataNavar);

    // ------ GET FIRST FILTER
    this.serviceServicios.tipoServicio$.subscribe(tipoServicio => {
      this.filtroBusqueda.typeServicio = tipoServicio;
    });

    this.get_list_filters(this.filtroBusqueda);
  }

  // --------- Change title
  transferedDataToNavar(value: any): void {
    this.titleService.setTitle(value);
  }

  // --------------- LOADS ------------ \\
  filtroBusqueda: FiltroGeneralServicios = new FiltroGeneralServicios();
  list_resultadoBusqueda: any[] = [];
  get_list_filters(filtro: FiltroGeneralServicios) {
    this.list_resultadoBusqueda = [];
    console.log(
      'filtro',
      filtro.typeServicio,
      filtro,
      filtro.filtroHabitaciones
    );
    this.loading.show();
    switch (filtro.typeServicio) {
      case 'HOSP': {
        this.load_habitaciones(filtro.filtroHabitaciones);
        break;
      }
      case 'REST': {
        this.load_restaurantes(filtro.filtroRestaurantes);
        break;
      }
      case 'TOUR': {
        this.load_tours(filtro.filtroTurs);
        break;
      }

    }
  }

  // ------------- OPCION PARA LOS FILTROS  -------------
  openModalFilters() {
    var data = {
      option: 'open',
      valueInput: this.filtroBusqueda.typeServicio,
    };
    this.modalService.activateModal(data);
  }
  selectFilterOptions() { }
  // ------------- LOADS SERVICIOS ---------------
  load_habitaciones(item: FiltroHabitaciones) {
    console.log('item', item);
    item.precio = +item.precio;
    this.habitacionService.get_habitaciones_byFiltro(item).subscribe(
      (data: any) => {
        console.log('habitaciones:', data);
        this.list_resultadoBusqueda = data;
        this.loading.hide();
        //console.log(data);
      },
      (err) => {
        console.log('NO ENCONTRO', err);
        this.loading.hide();
      }
    );
  }

  load_restaurantes(item: FiltroRestaurantes) {
    this.restauranteService.get_restaurantes_byFiltro(item).subscribe(
      (data: any) => {
        this.list_resultadoBusqueda = data;
        console.log('restaurantes:', data);
        this.loading.hide();
      },
      (err) => {
        this.loading.hide();
        console.log('NO ENCONTRO');
      }
    );
  }

  load_tours(item: FiltroTours) {
    console.log('item tour', item);
    this.toursService.filter_tours(item).subscribe(
      (data: any) => {
        this.list_resultadoBusqueda = [];
        this.list_resultadoBusqueda = data;
        console.log('tours:', data);
        this.loading.hide();
      },
      (err) => {
        this.loading.hide();
        console.log('NO ENCONTRO');
      }
    );
  }


  // ------------ SELECT HABITACION  ----------------
  gotoHabitacion(item: any) {
    this.router.navigate([
      'home',
      'Ancash',
      'Chacas',
      'servicios',
      'hospedaje',
      item.hotel.name_route,
      item.name_route,
    ]);
  }

  gotoTour(item: any) {
    this.router.navigate([
      'home',
      'Ancash',
      'Chacas',
      'servicios',
      'tour',
      item.agencia.name_route,
      item.name_route,
    ]);
  }

  gotoRestaurante(item: any) {
    this.router.navigate([
      'home',
      'Ancash',
      'Chacas',
      'servicios',
      'restaurante',
      item.name_route,
    ]);
  }


  // ----------- FUNCTION DROPDOWN SELECTOR --------------------
  dropdown: DropdownInterface;
  openDropDown(option: any) {
    if (option) {
      const $targetEl: HTMLElement = document.getElementById('dropdownMenu');
      const $triggerEl: HTMLElement = document.getElementById('dropdownButton');

      const options: DropdownOptions = {
        placement: 'bottom',
        triggerType: 'click',
        offsetSkidding: 0,
        offsetDistance: 10,
        delay: 300,
        onHide: () => {
          console.log('dropdown has been hidden');
        },
        onShow: () => {
          console.log('dropdown has been shown');
        },
        onToggle: () => {
          console.log('dropdown has been toggled');
        },
      };
      const instanceOptions: InstanceOptions = {
        id: 'dropdownMenu',
        override: true
      };

      this.dropdown = new Dropdown(
        $targetEl,
        $triggerEl,
        options,
        instanceOptions
      );

      // show the dropdown
      this.dropdown.show();
    } else {
      if (this.dropdown) {
        this.dropdown.hide();
      }
    }

  }

  selectService(service: any) {
    this.filtroBusqueda.typeServicio = service;
    this.get_list_filters(this.filtroBusqueda);
    this.openDropDown(false)
  }
}
