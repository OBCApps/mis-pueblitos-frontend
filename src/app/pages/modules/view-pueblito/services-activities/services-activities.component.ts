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
import { ToursService } from '../../../../services/tours.service';
import { ResturanteService } from '../../../../services/restaurante.service';

@Component({
  selector: 'app-services-activities',
  standalone: true,
  imports: [ModalFiltrosComponent, FormsModule],
  templateUrl: './services-activities.component.html',
  styleUrl: './services-activities.component.scss'
})
export class ServicesActivitiesComponent implements OnInit {

  constructor(
    private titleService: TitleService,
    private modalService: ModalFiltrosService,
    private habitacionService: HabitacionService,
    private toursService: ToursService,
    private restauranteService: ResturanteService,
    private router: Router,
  ) { }

  loading = false;

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
    console.log("filtro", filtro.typeServicio, filtro,filtro.filtroHabitaciones);
    this.loading = true;
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
      valueInput: this.filtroBusqueda.typeServicio,
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
        //console.log(data);
      } , err=> {
        console.log("NO ENCONTRO",err);
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
    this.restauranteService.get_restaurantes_byFiltro(item).subscribe(
      (data: any) => {
        this.list_resultadoBusqueda = data;
        console.log("restaurantes:",data);
        this.loading = false;
      } , err=> {
        console.log("NO ENCONTRO");
      }
    );
    /* this.habitacionService.get_habitaciones_byFiltro(item).subscribe(
      (data: any) => {

    }); */
  }

  load_tours(item: FiltroTours) {
    console.log("item tour",item);
    this.toursService.filter_tours(item).subscribe(
      (data: any) => {
        this.list_resultadoBusqueda = data;
        console.log("tours:",data);
        this.loading = false;
      } , err=> {
        console.log("NO ENCONTRO");
      }
    );
  }


  // ------------ SELECT HABITACION  ----------------
  gotoHabitacion(item: any) {
    console.log("item", item);

    this.router.navigate(['home','Ancash','Chacas','servicios', 'hospedaje', 'hotel-chacas' , item.name_route])
  }

  gotoTour(item:any){
    this.router.navigate(['home','Ancash','Chacas','servicios', 'tour', item.agencia.name_route , item.name_route]);
  }

  gotoRestaurante(item:any){
    this.router.navigate(['home','Ancash','Chacas','servicios', 'restaurante', item.name_route]);
  }
}
