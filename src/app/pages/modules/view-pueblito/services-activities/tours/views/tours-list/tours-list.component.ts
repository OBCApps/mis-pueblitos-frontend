import { Component } from '@angular/core';
import { FiltroGeneralServicios, FiltroTours } from '../../../entities/filtroGeneralServicios';
import { TitleService } from '../../../../view-pueblito.service';
import { ModalFiltrosService } from '../../../modal-filtros/modal-filtros.service';
import { HabitacionService } from '../../../../../../../services/habitacion.service';
import { ToursService } from '../../../../../../../services/tours.service';
import { Router } from '@angular/router';
import { ServicesActivitiesServices } from '../../../services-activities.service';
import { NgIf } from '@angular/common';
import { LoadingService } from '../../../../../../../shared/global-components/loadings/loading-service.service';

@Component({
  selector: 'app-tours-list',
  standalone: true,
  imports: [NgIf],
  templateUrl: './tours-list.component.html',
  styleUrl: './tours-list.component.scss'
})
export class ToursListComponent {

  filtroBusqueda: FiltroGeneralServicios = new FiltroGeneralServicios();
  list_resultadoBusqueda: any[] = [];
  constructor(
    private titleService: TitleService,
    private toursService: ToursService,
    private router: Router,
    private loading: LoadingService,
    private serviceServicios: ServicesActivitiesServices
  ) { }
  ngOnInit(): void {
    const dataNavar = {
      sidebar: 'tours-experiencias',
    };
    this.transferedDataToNavar(dataNavar);
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.filtroBusqueda.typeServicio = 'TOUR';
    this.load_tours(this.filtroBusqueda.filtroTurs);
  }
  load_tours(item: FiltroTours) {
    this.loading.show();
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
  transferedDataToNavar(value: any): void {
    this.titleService.setTitle(value);
  }


  gotoTour(item: any) {
    this.router.navigate([
      'home',
      'Ancash',
      'Chacas',
     
      'tours-experiencias',
      item.agencia.name_route,
      item.name_route,
    ]);
  }
}
