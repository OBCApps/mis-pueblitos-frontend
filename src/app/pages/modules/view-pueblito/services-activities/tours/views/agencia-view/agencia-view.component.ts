import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ToursService } from '../../../../../../../services/tours.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutesCreated } from '../../../../view-pueblito.service';
import { LoadingService } from '../../../../../../../functions/loadings/loading-service.service';
import { DtoAgenciaView } from '../../models/DtoAgenciaView';

@Component({
  selector: 'app-agencia-view',
  standalone: true,
  imports: [],
  templateUrl: './agencia-view.component.html',
  styleUrl: './agencia-view.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AgenciaViewComponent {
  constructor(
    private readonly toursService: ToursService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly loading: LoadingService
  ) { }

  agenciaView: DtoAgenciaView = new DtoAgenciaView();

  routesCreated: RoutesCreated = new RoutesCreated()
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.routesCreated.agencia_name = params['agencia_name'];

      this.loadAgencia(this.routesCreated.agencia_name);
    });
  }

  loadAgencia(agencia_name: string) {
    this.loading.show();
    this.toursService.get_agencia_by_name_route(agencia_name).subscribe(
      (data: DtoAgenciaView) => {
        this.agenciaView = data;
        this.loading.hide();
      },
      (err) => {
        this.loading.hide();
      }
    );
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
}
