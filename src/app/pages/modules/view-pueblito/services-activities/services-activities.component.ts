import { Component, OnInit } from '@angular/core';
import { TitleService } from '../view-pueblito.service';
import { ModalFiltrosService } from './modal-filtros/modal-filtros.service';
import { ModalFiltrosComponent } from './modal-filtros/modal-filtros.component';
import { FormsModule } from '@angular/forms';
import { HotelesService } from '../../../../services/hoteles.service';
import { DtoHoteles } from './hospedajes/entities/DtoHoteles';
import { Router, RouterLink } from '@angular/router';
import { FiltroGeneralServicios, FiltroHabitaciones, FiltroRestaurantes, FiltroTours } from './entities/filtroGeneralServicios';
import { HabitacionService } from '../../../../services/habitacion.service';

@Component({
  selector: 'app-services-activities',
  standalone: true,
  imports: [ModalFiltrosComponent, FormsModule],
  templateUrl: './services-activities.component.html',
  styleUrl: './services-activities.component.scss'
})
export class ServicesActivitiesComponent implements OnInit {
  service_to_show = 'HOSP'

  constructor(
    private titleService: TitleService,
    private modalService: ModalFiltrosService,
    private hotelesService: HotelesService,
    private habitacionService: HabitacionService,
    private router: Router,
  ) { }

  ngOnInit() {
    // --------- Change title
    const dataNavar = {
      sidebar: 'servicios',
    };
    this.transferedDataToNavar(dataNavar);


    // ------ GET FIRST FILTER
    this.filtroBusqueda.typeServicio = 'HOSP'
    this.get_list_filters(this.filtroBusqueda);
  }

  // --------- Change title
  transferedDataToNavar(value: any): void {
    this.titleService.setTitle(value);
  }

  // --------------- LOADS ------------ \\
  filtroBusqueda: FiltroGeneralServicios = new FiltroGeneralServicios();
  list_resultadoBusqueda: any[] = []
  get_list_filters(filtro: FiltroGeneralServicios) {
    console.log("filtro", filtro,filtro.filtroHabitaciones);
    switch (filtro.typeServicio) {
      case ('HOSP'): {
        this.load_habitaciones(filtro.filtroHabitaciones);
        break;
      }
      case ('REST'): {
        this.load_restaurantes(filtro.filtroRestaurantes);
        break;
      }
      case ('TOUR'): {
        this.load_tours(filtro.filtroTurs);
        break;
      }
    }

  }

  // ------------- OPCION PARA LOS FILTROS  -------------
  openModalFilters() {
    var data = {
      option: 'open',
      valueInput: this.service_to_show
    }
    this.modalService.activateModal(data);
  }
  selectFilterOptions() {

  }
  // ------------- LOADS SERVICIOS ---------------
  load_habitaciones(item: FiltroHabitaciones) {
    console.log("item", item);
    item.precio = +item.precio;
    // ---- Aqui retornara todas las habitaciones. solamente con la informacion necesaria para mostrar la lista
    this.habitacionService.get_habitaciones_byFiltro(item).subscribe(
      (data: any) => {
        this.list_resultadoBusqueda = data;
      } , err=> {
        console.log("NO ENCONTRO");

      }
    );

    /*this.habitacionService.get_habitaciones().subscribe(
      (data: any) => {
        this.list_resultadoBusqueda = data;
      } , err=> {
        console.log("NO ENCONTRO");

      }
    );*/
  }

  load_restaurantes(item: FiltroRestaurantes) {
    /* this.habitacionService.get_habitaciones_byFiltro(item).subscribe(
      (data: any) => {

    }); */
  }

  load_tours(item: FiltroTours) {
    /* this.habitacionService.get_habitaciones_byFiltro(item).subscribe(
      (data: any) => {

    }); */
  }


  // ------------ SELECT HABITACION  ----------------
  gotoHabitacion(item: any) {
    console.log("item", item);

    this.router.navigate(['home','Ancash','Chacas','servicios', 'hospedaje', 'hotel-chacas' , item.name_route])
  }
}
