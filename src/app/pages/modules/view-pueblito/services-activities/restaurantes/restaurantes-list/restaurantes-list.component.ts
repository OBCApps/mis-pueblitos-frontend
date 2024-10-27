import { Component } from '@angular/core';
import { FiltroGeneralServicios, FiltroRestaurantes } from '../../entities/filtroGeneralServicios';
import { TitleService } from '../../../view-pueblito.service';
import { ModalFiltrosService } from '../../modal-filtros/modal-filtros.service';
import { HabitacionService } from '../../../../../../services/habitacion.service';
import { ToursService } from '../../../../../../services/tours.service';
import { ResturanteService } from '../../../../../../services/restaurante.service';
import { Router } from '@angular/router';
import { LoadingService } from '../../../../../../functions/loadings/loading-service.service';
import { ServicesActivitiesServices } from '../../services-activities.service';

@Component({
  selector: 'app-restaurantes-list',
  standalone: true,
  imports: [],
  templateUrl: './restaurantes-list.component.html',
  styleUrl: './restaurantes-list.component.scss'
})
export class RestaurantesListComponent {
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
    const dataNavar = {
      sidebar: 'restaurantes',
    };
    this.transferedDataToNavar(dataNavar);
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.filtroBusqueda.typeServicio = 'REST';
    this.load_restaurantes(this.filtroBusqueda.filtroRestaurantes);
  }
  load_restaurantes(item: FiltroRestaurantes) {
    this.loading.show();
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
  transferedDataToNavar(value: any): void {
    this.titleService.setTitle(value);
  }

  gotoRestaurante(item: any) {
    this.router.navigate([
      'home',
      'Ancash',
      'Chacas',
     
      'restaurantes',
      item.name_route,
    ]);
  }
}
