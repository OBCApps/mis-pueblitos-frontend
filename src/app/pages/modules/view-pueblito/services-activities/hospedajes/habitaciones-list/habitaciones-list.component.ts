import { Component } from '@angular/core';
import { FiltroGeneralServicios, FiltroHabitaciones } from '../../entities/filtroGeneralServicios';
import { TitleService } from '../../../view-pueblito.service';
import { ModalFiltrosService } from '../../modal-filtros/modal-filtros.service';
import { HabitacionService } from '../../../../../../services/habitacion.service';
import { ToursService } from '../../../../../../services/tours.service';
import { ResturanteService } from '../../../../../../services/restaurante.service';
import { Router } from '@angular/router';
import { LoadingService } from '../../../../../../functions/loadings/loading-service.service';
import { ServicesActivitiesServices } from '../../services-activities.service';

@Component({
  selector: 'app-habitaciones-list',
  standalone: true,
  imports: [],
  templateUrl: './habitaciones-list.component.html',
  styleUrl: './habitaciones-list.component.scss'
})
export class HabitacionesListComponent {
  filtroBusqueda: FiltroGeneralServicios = new FiltroGeneralServicios();
  list_resultadoBusqueda: any[] = [];
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
  ngOnInit(): void {
    const dataNavar = { sidebar: 'hospedajes' };
    this.transferedDataToNavar(dataNavar);

    this.filtroBusqueda.typeServicio = 'HOSP';
    this.load_habitaciones(this.filtroBusqueda.filtroHabitaciones);
  }
  load_habitaciones(item: FiltroHabitaciones) {
    this.loading.show();
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
  transferedDataToNavar(value: any): void {
    this.titleService.setTitle(value);
  }
  gotoHabitacion(item: any) {
    this.router.navigate(['home', 'Ancash', 'Chacas', 'hospedajes', item.hotel.name_route, item.name_route,]);
  }
}
