import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AtractivoTuristicoService } from '../../../../../services/atractivos-turisticos.service';
import { DtoAtractivo, DtoAtractivos } from './entities/DtoAtractivos';
import { CommonModule } from '@angular/common';
import { FiltroGeneralServicios, FiltroTours } from '../entities/filtroGeneralServicios';
import { TitleService } from '../../view-pueblito.service';
import { ToursService } from '../../../../../services/tours.service';
import { LoadingService } from '../../../../../shared/global-components/loadings/loading-service.service';
import { ServicesActivitiesServices } from '../services-activities.service';
import { BaseServices } from '../../../../../shared/global-components/BaseServices';
import { FilterAtractivosTuristicos } from './models/FilterAtractivosTuristicos';
import { BaseComponents } from '../../../../../shared/global-components/BaseComponents';
import { Constants } from '../../../../../shared/global-components/Constants';

@Component({
  selector: 'app-atractivos-turisticos-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './atractivos-turisticos.list.component.html',
  styleUrl: './atractivos-turisticos.list.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AtractivosTuristicosListComponent extends BaseComponents {/* 
    constructor(
      private titleService: TitleService,
      private atractivoTuristicoService: AtractivoTuristicoService,
      private loading: LoadingService,
      private router: Router
    ) { }

  ngOnInit() {

    this.load_turis()


    const dataNavar = {
      sidebar: 'lugares-turisticos',
    };
    this.transferedDataToNavar(dataNavar);
  }

  transferedDataToNavar(value: any): void {
    this.titleService.setTitle(value);
  }
  list_resultadoBusqueda: any[] = []

  load_turis() {
    this.loading.show();
    this.atractivoTuristicoService.get_atractivos_turisticos().subscribe(
      (data: any) => {
        this.list_resultadoBusqueda = data;
        console.log('turisticos:', data);
        this.loading.hide();
      },
      (err) => {
        console.log('NO ENCONTRO');
        this.loading.hide();
      }
    );
  }
  gotoAtractivoTuristico(item: any) {
    this.router.navigate([
      'home',
      'Ancash',
      'Chacas',
      'servicios',
      'atractivo-turistico',
      item.name_route,
    ]);
  }
 */

  filter: FilterAtractivosTuristicos = new FilterAtractivosTuristicos();
  list_resultadoBusqueda: any[] = []

  constructor(
    private router: Router,
    private baseServices: BaseServices,
    private atractivoTuristicoService: AtractivoTuristicoService,
  ) {
    super();
  }
  ngOnInit(): void {
    // En un caso real, estos datos vendrían de un servicio
    this.baseServices.showLoading();

    this.atractivoTuristicoService.get_atractivos_turisticospaginado(this.filter).subscribe(
      (data: FilterAtractivosTuristicos) => {
        this.list_resultadoBusqueda = data.paginationresult.result;
        this.baseServices.hideLoading();
      },
      (err) => {
        console.log('NO ENCONTRO');
        this.baseServices.hideLoading();
      }
    );

  }

  gotoAtractivoTuristico(item: any): void {

    const departamento = item && item.lugar && item.lugar.departamento && item.lugar.departamento.name_route;
    if (!departamento) { this.baseServices.showMessageError('Departamento no encontrado'); return; }

    const lugar = item && item.lugar && item.lugar.name_route;
    if (!lugar) { this.baseServices.showMessageError('Lugar no encontrado'); return; }

    const route = `${Constants.HOME}/${departamento}/${lugar}/${Constants.ATRACTIVOSTURISTICOS}`;
    
    this.router.navigate([route + '/' + item.name_route])
  }

  // Método para generar estrellas basadas en el rating
  generateRatingStars(rating: number): number[] {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    const stars = Array(5).fill(0)

    for (let i = 0; i < fullStars; i++) {
      stars[i] = 1 // Estrella completa
    }

    if (hasHalfStar && fullStars < 5) {
      stars[fullStars] = 0.5 // Media estrella
    }

    return stars
  }

}

