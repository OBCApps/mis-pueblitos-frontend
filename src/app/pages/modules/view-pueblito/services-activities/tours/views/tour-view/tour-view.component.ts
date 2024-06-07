import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { ToursService } from '../../../../../../../services/tours.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutesCreated } from '../../../../view-pueblito.service';
import { DtoTourView } from '../../models/DtoTourView';
import { LoadingService } from '../../../../../../../functions/loadings/loading-service.service';

@Component({
  selector: 'app-tour-view',
  standalone: true,
  imports: [],
  templateUrl: './tour-view.component.html',
  styleUrl: './tour-view.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TourViewComponent {
  constructor(
    private readonly toursService: ToursService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly loading: LoadingService
  ) { }
  routesCreated: RoutesCreated = new RoutesCreated()
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.routesCreated.agencia_name = params['agencia_name'];
      this.routesCreated.tour_name = params['tour_name'];

      this.loadTour(this.routesCreated.tour_name);
    });
  }
  tourView: DtoTourView = new DtoTourView();
  loadTour(tour_name: string) {
    this.loading.show();
    this.toursService.get_tour_by_name_route(tour_name).subscribe(
      (data: DtoTourView) => {
        this.tourView = data;
        this.loading.hide();
      }, err => {
        this.loading.hide();
      }
    );
  }

  gotoAgencia() {
    this.router.navigate(['home', 'Ancash', 'Chacas', 'servicios', 'tour', this.routesCreated.agencia_name]);
  }


}
