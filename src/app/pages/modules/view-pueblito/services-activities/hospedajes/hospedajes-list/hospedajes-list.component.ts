import { Component } from '@angular/core';
import { FiltroGeneralServicios, FiltroHabitaciones } from '../../entities/filtroGeneralServicios';
import { TitleService } from '../../../view-pueblito.service';
import { ModalFiltrosService } from '../../modal-filtros/modal-filtros.service';
import { HabitacionService } from '../../../../../../services/habitacion.service';
import { ToursService } from '../../../../../../services/tours.service';
import { ResturanteService } from '../../../../../../services/restaurante.service';
import { Router } from '@angular/router';
import { ServicesActivitiesServices } from '../../services-activities.service';
import { HotelesService } from '../../../../../../services/hoteles.service';
import { FiltroHospedaje } from '../models/FiltroHospedajes';
import { LoadingService } from '../../../../../../shared/global-components/loadings/loading-service.service';

@Component({
  selector: 'app-hospedajes-list',
  standalone: true,
  imports: [],
  templateUrl: './hospedajes-list.component.html',
  styleUrl: './hospedajes-list.component.scss'
})
export class HospedajesListComponent {
  filtroBusqueda: FiltroHospedaje = new FiltroHospedaje();
  list_resultadoBusqueda: any[] = [];
  constructor(
    private titleService: TitleService,
    private hotelesService: HotelesService,
    private router: Router,
    private loading: LoadingService,
  ) { }
  ngOnInit(): void {
    const dataNavar = { sidebar: 'hospedajes' };
    this.transferedDataToNavar(dataNavar);
    this.filtroBusqueda.status = 'AC';
    this.load_hospedajes();
  }
  load_hospedajes() {
    this.loading.show();

    this.hotelesService.filter_pagination(this.filtroBusqueda).subscribe(
      (response: any) => {
        this.list_resultadoBusqueda = response.paginationresult.result;
        this.loading.hide();

      },
      (err) => {
        this.loading.hide();
      }
    );
  }
  transferedDataToNavar(value: any): void {
    this.titleService.setTitle(value);
  }
  goToHospedaje(item: any) {
    this.router.navigate([
      'home',
      'Ancash',
      'Chacas',
      'hospedajes',
      item.name_route,
      
    ]);
  }
}
